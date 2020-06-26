<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">
              <span>C</span>harts
            </h2>
          </div>

          <div class="group-head my-3 text-center text-md-left mb-5">
            <span class="stats-span">{{ chartSelected }}</span>
            <b-form-select class="stats-select mb-2" v-model="chartSelected" :options="chartsList"></b-form-select>
            <p class="m-0">{{ chart.description }}</p>
          </div>
          <div class="mb-2">
            <b-form-radio-group
              id="btn-radios-1"
              v-model="daysSelected"
              :options="daysOptions"
              buttons
              @input="daysChanged"
              name="radios-btn-default"
            ></b-form-radio-group>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <template v-if="labels.length > 0">
              <LineChart id="1" :labels.sync="labels" :data.sync="data"></LineChart>
            </template>
          </div>
        </b-col>
        <b-col cols="12">
          <h3 class="head-global my-3">Rich List</h3>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-table dark :items="balanceInterval" :fields="fields">
              <template v-slot:cell(percentAddresses)="data">{{ data.item.percentAddresses.toFixed(2) }}% [{{ data.item.percentAddressesTotal.toFixed(2) }}%]</template>
              <template v-slot:cell(percentCoins)="data">{{ data.item.percentCoins.toFixed(2) }}% [{{ data.item.percentCoinsTotal.toFixed(2) }}%]</template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import { Vue, Component, Watch } from 'vue-property-decorator'
import LineChart from '@/components/LineChart.vue'
import statisticsModule from '@/api/statistics/index'
import { toMonthDayFormat } from '@/api/filters'
import {
  SupplyStats,
  FeeStat,
  TransactionStats,
  OutputStat,
  DifficultyStats,
  StakeStats,
  BalanceIntervalsTable
} from '../api/statistics/type'

@Component({
  components: {
    LineChart
  }
})
export default class Charts extends Vue {
  totalSupply: SupplyStats[] = []
  fees: FeeStat[] = []
  transactions: TransactionStats[] = []
  outputs: OutputStat[] = []
  difficulty: DifficultyStats[] = []
  stakes: StakeStats[] = []
  balanceInterval: BalanceIntervalsTable[] = []

  labels: any[] = []
  data: any[] = []
  chartsList: string[] = []

  chartSelected: string = ''
  chart = {}
  // TODO: find other way to handle these data
  allCharts = [
    {
      name: 'ECOC Total supply',
      description: 'Check current ECOC supply. Maximum supply is 2,000,000,000 ECOC',
      getData: this.getSupplyData
    },
    {
      name: 'Fees',
      description:
        'The total value of all transaction fees paid to miners (not including the coinbase value of block rewards).',
      getData: this.getFeesData
    },
    {
      name: 'Transactions',
      description: 'The number of daily confirmed ECOC transactions.',
      getData: this.getTransactionsData
    },
    {
      name: 'Outputs',
      description:
        'The total value of all transaction outputs per day (includes coins returned to the sender as change).',
      getData: this.getOutputsData
    },
    {
      name: 'Difficulty',
      description:
        'A relative measure of how difficult it is to find a new block. The difficulty is adjusted periodically as a function of how much hashing power has been deployed by the network of miners.',
      getData: this.getDifficultyData
    },
    {
      name: 'Stakes',
      description: '',
      getData: this.getStakesData
    }
  ]

  daysOptions = [
    { text: '30 Days', value: '30' },
    { text: '60 Days', value: '60' },
    { text: '180 Days', value: '180' },
    { text: '1 Year', value: '365' },
    { text: '2 Years', value: '730' },
    { text: 'All Time', value: 'all' }
  ]

  daysSelected = '30'

  // Table part
  fields = [
    { key: 'balance', sortable: true },
    { key: 'addresses', sortable: true },
    {
      key: 'percentAddresses',
      label: '% Addresses [Total]',
      sortable: true,
      formatter: (value: any) => `${value.toFixed(2)} %`
    },
    {
      key: 'coins',
      sortable: true
    },
    {
      key: 'percentCoins',
      label: '% Coins [Total]',
      sortable: true,
      formatter: (value: any) => `${value.toFixed(2)} %`
    }
  ]

  async mounted() {
    // console.log(await this.getSupplyData('30'))
    this.chartsList = this.allCharts.map(chart => chart.name)

    const params = this.$route.params.type
    // if given params is not undefined
    if (params !== undefined) {
      this.chartSelected = params
    } else {
      this.chartSelected = this.chartsList[0]
    }

    const index = this.chartsList.indexOf(this.chartSelected)
    this.chart = this.allCharts[index]

    this.getSupplyData(this.daysSelected).then(val => {
      this.labels = val.tsDate
      this.data = val.tsData
    })

    this.balanceInterval = await statisticsModule.getBalanceIntervalsTable()
    console.log('balance interval', this.balanceInterval)
  }

  async getSupplyData(days?: any) {
    this.totalSupply = await statisticsModule.getSupplyStats(days)
    let tsDate = this.totalSupply
      .map(ts => {
        return toMonthDayFormat(ts.date.toString())
      })
      .reverse()
    // sum
    let tsData = this.totalSupply.map(ts => ts.sum).reverse()
    return { tsDate, tsData }
  }

  async getFeesData(days?: any) {
    this.fees = await statisticsModule.getFeeStats(days)
    let tsDate = this.fees
      .map(ts => {
        return toMonthDayFormat(ts.date.toString())
      })
      .reverse()
    // fee
    let tsData = this.fees.map(ts => ts.fee).reverse()

    return { tsDate, tsData }
  }

  async getTransactionsData(days?: any) {
    this.transactions = await statisticsModule.getTransactionStats(days)
    let tsDate = this.transactions
      .map(ts => {
        return toMonthDayFormat(ts.date.toString())
      })
      .reverse()

    let tsData = this.transactions.map(ts => ts.transaction_count).reverse()

    return { tsDate, tsData }
  }

  async getOutputsData(days?: any) {
    this.outputs = await statisticsModule.getOutputStats(days)
    let tsDate = this.outputs
      .map(ts => {
        return toMonthDayFormat(ts.date.toString())
      })
      .reverse()

    let tsData = this.outputs.map(ts => Number(ts.sum) / Math.pow(10, 8)).reverse()

    return { tsDate, tsData }
  }

  async getDifficultyData(days?: any) {
    this.difficulty = await statisticsModule.getDifficultyStats(days)
    let tsDate = this.difficulty
      .map(ts => {
        return toMonthDayFormat(ts.date.toString())
      })
      .reverse()

    let tsData = this.difficulty.map(ts => ts.sum).reverse()

    return { tsDate, tsData }
  }

  async getStakesData(days?: any) {
    this.stakes = await statisticsModule.getStakeStats(days)
    let tsDate = this.stakes
      .map(ts => {
        return toMonthDayFormat(ts.date.toString())
      })
      .reverse()

    let tsData = this.stakes.map(ts => ts.sum).reverse()

    return { tsDate, tsData }
  }

  async daysChanged() {
    //@ts-ignore
    this.chart.getData(this.daysSelected).then(val => {
      this.labels = val.tsDate
      this.data = val.tsData
    })
  }

  @Watch('chartSelected')
  async onChartChanged(val: string) {
    const index = this.chartsList.indexOf(val)
    this.chart = this.allCharts[index]
    //@ts-ignore
    this.chart.getData().then(val => {
      this.labels = val.tsDate
      this.data = val.tsData
    })
  }
}
</script>

<style lang="scss" scoped>
select:hover {
  border-color: white !important;
}

.stats-select {
  border-color: transparent;
  color: transparent;
  background-color: transparent;
  width: auto;
  outline-color: transparent;
  padding-bottom: 3.3rem;
  padding-right: 6.75rem;
  padding-left: 3rem;
  cursor: pointer;
}

.stats-span {
  color: white;
  font-size: 1.75rem;
  position: absolute;
  padding-left: 6px;
  padding-top: 9px;
  cursor: pointer;
  pointer-events: none;
}
</style>
