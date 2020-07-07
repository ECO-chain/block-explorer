<template>
  <canvas :id="graphId"></canvas>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'

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
            borderWidth: 3,
            lineTension: 0,
            fill: true,
            pointBackgroundColor: '#803e9d',
            pointBorderWidth: 5,
            pointHoverRadius: 10,
            pointRadius: 0,
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
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 8,
                userCallback: function(value: any) {
                  return value.toLocaleString()
                }
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

<style lang="scss" scoped></style>
