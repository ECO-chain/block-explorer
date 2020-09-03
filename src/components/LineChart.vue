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
            borderColor: this.gradientStroke,
            backgroundColor: '#141721',
            borderWidth: 3,
            lineTension: 0,
            fill: true,
            pointBackgroundColor: this.gradientStroke,
            pointBorderWidth: 0.1,
            pointHoverRadius: 5,
            pointBorderColor: this.gradientStroke,
            pointHoverBackgroundColor: this.gradientStroke,
            pointHoverBorderColor: this.gradientStroke,
            pointRadius: 0.1,
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
        },
        animation: {
          easing: 'easeInOutQuint'
        }
      }
    })
  }

  get gradientStroke() {
    //@ts-ignore
    const ctx = this.ctx.getContext('2d')
    const gradientStroke = ctx.createLinearGradient(500, 50, 100, 100)
    // gradientStroke.addColorStop(1, '#ff4000')
    // gradientStroke.addColorStop(0, '#0a0eFF')
    gradientStroke.addColorStop(0.5, '#9c2bc4')
    gradientStroke.addColorStop(1, '#c915b0')
    gradientStroke.addColorStop(0, '#92009c')

    return gradientStroke
  }

  get bgGradientStroke() {
    //@ts-ignore
    const ctx = this.ctx.getContext('2d')
    const gradientStroke = ctx.createLinearGradient(500, 50, 100, 100)
    // gradientStroke.addColorStop(1, '#ff4000')
    // gradientStroke.addColorStop(0, '#0a0eFF')
    gradientStroke.addColorStop(0.5, 'rgba(156,43,196,0.1)')
    gradientStroke.addColorStop(1, 'rgba(201,21,176,0.1)')
    gradientStroke.addColorStop(0, 'rgba(146,0,156,0.1)')

    return gradientStroke
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
