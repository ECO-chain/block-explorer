<template>
  <canvas :id="graphId"></canvas>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'
// import { toMonthDayFormat, numberWithCommas } from '@/api/filters'

@Component({})
export default class LineChart extends Vue {
  @PropSync('id', { type: String }) readonly idNumber!: number
  @PropSync('labels', { type: Array }) labelSet!: string[] | number[]
  @PropSync('data', { type: Array }) dataSet!: string[] | number[]

  graphId = `graph${this.idNumber}`
  myChart = null

  mounted() {
    Chart.defaults.global.legend.display = false
    this.renderChart(this.ctx!, this.labelSet, this.dataSet)
  }

  get ctx() {
    return document.getElementById(this.graphId)
  }

  renderChart(element: HTMLElement, labelSet: any[], dataSet: any[]) {
    this.myChart = new Chart(element, {
      type: 'line',
      data: {
        labels: labelSet,
        datasets: [
          {
            borderColor: '#803e9d',
            backgroundColor: '#141725',
            borderWidth: 2,
            lineTension: 0,
            pointBackgroundColor: '#803e9d',
            pointBorderWidth: 4,
            pointStyle: 'rect',
            data: dataSet
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 8,
                maxRotation: 0
                // padding: 25,
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 8
              }
            }
          ]
        }
      }
    })
  }

  @Watch('labelSet')
  onLabelChanged(set: any) {
    //@ts-ignore
    this.myChart!.destroy()
    this.labelSet = set
    this.renderChart(this.ctx!, this.labelSet, this.dataSet)
  }

  @Watch('dataSet')
  onDataChanged(set: any) {
    //@ts-ignore
    this.myChart!.destroy()
    this.dataSet = set
    this.renderChart(this.ctx!, this.labelSet, this.dataSet)
  }
}
</script>

<style lang="scss" scoped>
</style>
