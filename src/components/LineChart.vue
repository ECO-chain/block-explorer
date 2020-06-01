<template>
    <canvas id="graph"></canvas>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component({})
export default class LineChart extends Vue {
  @PropSync('id', {type: String}) readonly idNumber!: number
  @PropSync('labels', {type: Array}) readonly labelSet!: string[] | number[]
  @PropSync('data', {type: Array}) readonly dataSet!: string[] | number[]

  graphId = `graph${this.idNumber}`

  mounted() {

    console.log('labels is', this.labelSet)
    console.log('data is', this.dataSet)

    Chart.defaults.global.legend.display = false
    var ctx = document.getElementById('graph')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelSet,
        datasets: [
          {
            borderColor: '#803e9d',
            backgroundColor: '#141725',
            borderWidth: 2,
            lineTension: 0,
            pointBackgroundColor: '#803e9d',
            pointBorderWidth: 4,
            pointStyle: 'rect',
            data: this.dataSet
          }
        ],
        options: {}
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
