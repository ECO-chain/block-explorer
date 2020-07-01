<template>
  <div>
    <div class="group-head my-3 text-center text-md-left mb-5">
      <span class="stats-span">{{ chartSelected }}</span>
      <b-form-select class="stats-select mb-2" v-model="chartSelected" :options="chartsList"></b-form-select>
      <p class="m-0">{{ chart.description }}</p>
    </div>
    <div class="mb-2 time-selector">
      <b-form-radio-group
        id="btn-radios-1"
        v-model="daysSelected"
        :options="daysOptions"
        buttons
        class="custom-radio-btn"
        @input="daysChanged"
        name="radios-btn-default"
      ></b-form-radio-group>
    </div>
    <div class="block-global p-3 mb-3 rounded-lg">
      <template v-if="labels.length > 0">
        <LineChart id="1" :labels.sync="labels" :data.sync="data"></LineChart>
      </template>
    </div>
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
export default class ChartSelector extends Vue {
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

  allCharts: any[] = []
  daysOptions: any[] = []

  daysSelected = '30'

  created() {
    // TODO: find other way to handle these data
    this.allCharts = [
      {
        name: this.$t('components.chart_selector.ecoc_total_supply'),
        description: this.$t('components.chart_selector.ecoc_total_supply_desc'),
        getData: this.getSupplyData
      },
      {
        name: this.$t('components.chart_selector.fees'),
        description: this.$t('components.chart_selector.fees_desc'),
        getData: this.getFeesData
      },
      {
        name: this.$t('components.chart_selector.tx'),
        description: this.$t('components.chart_selector.tx_desc'),
        getData: this.getTransactionsData
      },
      {
        name: this.$t('components.chart_selector.outputs'),
        description: this.$t('components.chart_selector.outputs_desc'),
        getData: this.getOutputsData
      },
      {
        name: this.$t('components.chart_selector.difficulty'),
        description: this.$t('components.chart_selector.difficulty_desc'),
        getData: this.getDifficultyData
      },
      {
        name: this.$t('components.chart_selector.stakes'),
        description: '',
        getData: this.getStakesData
      }
    ]

    this.daysOptions = [
      { text: `30 ${this.$t('components.chart_selector.days')}`, value: '30' },
      { text: `60 ${this.$t('components.chart_selector.days')}`, value: '60' },
      { text: `180 ${this.$t('components.chart_selector.days')}`, value: '180' },
      { text: `1 ${this.$t('components.chart_selector.year')}`, value: '365' },
      { text: `2 ${this.$t('components.chart_selector.year')}`, value: '730' },
      { text: `${this.$t('components.chart_selector.all_time')}`, value: 'all' }
    ]
  }

  async mounted() {
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
.time-selector {
  overflow: auto;
  text-align: right;
}

.stats-select {
  border: 1px solid transparent;
  color: transparent;
  width: auto;
  outline-color: transparent;
  padding-bottom: 2.7rem;
  padding-right: 3.75rem;
  padding-left: 3rem;
  cursor: pointer;
  border-radius: 5px !important;
  box-shadow: #1c1c34 0px 1px 20px 20px;
}

.stats-select:hover {
  border: 1px solid white;
}

.stats-span {
  color: white;
  font-size: 1.35rem;
  position: absolute;
  padding-left: 23px;
  padding-top: 9px;
  cursor: pointer;
  pointer-events: none;
}

@media (max-width: 767px) {
  .time-selector {
    text-align: center;
  }
}
</style>
