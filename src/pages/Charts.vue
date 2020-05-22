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

          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global mb-1">ECOC total supply</h3>
            <p class="m-0">Check current ECOC supply.</p>
            <p class="m-0">Maximum supply is 2,000,000,000 ECOC</p>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <canvas id="graph"></canvas>
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
import { Vue, Component } from "vue-property-decorator";
import Chart from "chart.js";

@Component
export default class Charts extends Vue {
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