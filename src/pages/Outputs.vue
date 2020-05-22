<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">
              <span>O</span>utputs
            </h2>
            <p class="m-0">The total value of all transaction outputs per day (includes coins returned to the sender as change).</p>
          </div>
          <!-- END .group-head -->
          <div class="block-global p-3 mb-3 rounded-lg">
            <canvas id="graph"></canvas>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Chart from "chart.js";

@Component
export default class Outputs extends Vue {
  mounted() {
    this.chartInit()
  }

  chartInit() {
    Chart.defaults.global.legend.display = false;
    var ctx = document.getElementById("graph");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            borderColor: "#803e9d",
            backgroundColor: "#141725",
            borderWidth: 2,
            lineTension: 0,
            pointBackgroundColor: "#803e9d",
            pointBorderWidth: 4,
            pointStyle: "rect",
            data: [217000, 217500, 218000, 218500, 219000, 219500, 220000]
          }
        ],
        options: {}
      }
    });
  }
}
</script>