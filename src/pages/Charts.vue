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
          <!-- END .group-head -->
          <div class="group-head my-3 text-center text-md-left mb-5">
            <span class="stats-span">{{ chartSelected }}</span>
            <b-form-select class="stats-select mb-2" v-model="chartSelected" :options="chartsList"></b-form-select>
            <!-- <h3 class="head-global mb-1">ECOC total supply</h3> -->
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
            <div class="table-responsive">
              <table class="table table-hover table-dark">
                <thead style="text-align:center;">
                  <tr>
                    <th>BALANCE</th>
                    <th>ADDRESSES</th>
                    <th class="text-center">% ADDRESSES (TOTAL)</th>
                    <th class="text-nowrap">COINS</th>
                    <th class="text-center text-nowrap">% COINS (TOTAL)</th>
                  </tr>
                </thead>
                <tbody class="small" style="text-align:center;">
                  <tr>
                    <td>0 - 0.001</td>
                    <td>0</td>
                    <td class="text-center">0% [0%]</td>
                    <td>0 ECOC</td>
                    <td class="text-center">0% [0%]</td>
                  </tr>
                  <tr>
                    <td>0.001 - 0.01</td>
                    <td>1</td>
                    <td class="text-center">0.02% [0.04%]</td>
                    <td>0.0087452 ECOC</td>
                    <td class="text-center">0% [0%]</td>
                  </tr>
                  <tr>
                    <td>0.01 - 0.1</td>
                    <td>19</td>
                    <td class="text-center">0.37% [0.67%]</td>
                    <td>0.57050417 ECOC</td>
                    <td class="text-center">0% [0%]</td>
                  </tr>
                  <tr>
                    <td>0.1 - 1</td>
                    <td>4</td>
                    <td class="text-center">0.08% [0.14%]</td>
                    <td>3.7155352 ECOC</td>
                    <td class="text-center">0% [0%]</td>
                  </tr>
                  <tr>
                    <td>1 - 10</td>
                    <td>24</td>
                    <td class="text-center">0.47% [0.84%]</td>
                    <td>200.28739612 ECOC</td>
                    <td class="text-center">0% [0%]</td>
                  </tr>
                  <tr>
                    <td>10 - 100</td>
                    <td>1,325</td>
                    <td class="text-center">26.14% [46.64%]</td>
                    <td>43,729.20128735 ECOC</td>
                    <td class="text-center">0.02% [0.04%]</td>
                  </tr>
                  <tr>
                    <td>100 - 1,000</td>
                    <td>714</td>
                    <td class="text-center">14.09% [25.13%]</td>
                    <td>370,401.81387012 ECOC</td>
                    <td class="text-center">0.17% [0.35%]</td>
                  </tr>
                  <tr>
                    <td>1,000 - 10,000</td>
                    <td>2,841</td>
                    <td class="text-center">56.06% [100%]</td>
                    <td>7,005,914.41945736 ECOC</td>
                    <td class="text-center">3.17% [6.67%]</td>
                  </tr>
                  <tr>
                    <td>10,000 - 100,000</td>
                    <td>130</td>
                    <td class="text-center">2.57% [4.58%]</td>
                    <td>1,842,057.73826896 ECOC</td>
                    <td class="text-center">0.83% [1.75%]</td>
                  </tr>
                  <tr>
                    <td>100,000 - 1,000,000</td>
                    <td>6</td>
                    <td class="text-center">0.12% [0.21%]</td>
                    <td>3,303,226.60951744 ECOC</td>
                    <td class="text-center">1.49% [3.14%]</td>
                  </tr>
                  <tr>
                    <td>1,000,000 - 10,000,000</td>
                    <td>1</td>
                    <td class="text-center">0.02% [0.04%]</td>
                    <td>1,917,253.00876356 ECOC</td>
                    <td class="text-center">0.87% [1.82%]</td>
                  </tr>
                  <tr>
                    <td>10,000,000 - 100,000,000</td>
                    <td>2</td>
                    <td class="text-center">0.04% [0.07%]</td>
                    <td>105,074,152.15481384 ECOC</td>
                    <td class="text-center">47.48% [100%]</td>
                  </tr>
                  <tr>
                    <td>100,000,000 - 1,000,000,000</td>
                    <td>1</td>
                    <td class="text-center">0.02% [0.04%]</td>
                    <td>101,744,315.47184068 ECOC</td>
                    <td class="text-center">45.98% [96.83%]</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
  StakeStats
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
