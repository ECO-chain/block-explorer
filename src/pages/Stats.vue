<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">{{ $t('views.stats.stats') }}</h2>
            <p class="my-0">{{ $t('views.stats.ecoc_stats_last') }}</p>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">{{ $t('views.stats.block_summary') }}</h3>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row class="align-items-center">
              <b-col cols="6">
                <div class="stats-label">{{ $t('views.stats.block_minted') }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right">{{ totalStats.n_blocks_mined | numberWithCommas }}</div>
              </b-col>
              <b-col cols="6">
                <div class="stats-label">{{ $t('views.stats.time_blocks') }}</div>
              </b-col>
              <b-col cols="6">
                <div
                  class="my-1 text-right"
                >{{ totalStats.time_between_blocks | numberWithCommas }} secs</div>
              </b-col>
              <b-col cols="6">
                <div class="stats-label">{{ $t('views.stats.minted_ecoc') }}</div>
              </b-col>
              <b-col cols="6">
                <div
                  class="my-1 text-right"
                >{{ totalStats.mined_currency_amount | numberWithCommas({decimal: 8}) }} ECOC</div>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">{{ $t('views.stats.tx_summary') }}</h3>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row class="align-items-center">
              <b-col>
                <div class="stats-label">{{ $t('views.stats.total_tx_fee') }}</div>
              </b-col>
              <b-col>
                <div
                  class="my-1 text-right"
                >{{ totalStats.transaction_fees | numberWithCommas({decimal: 8}) }} ECOC</div>
              </b-col>
              <b-col cols="12" md="auto">
                <b-button class="btn-view-chart" size="sm" @click="goToCharts('fees')">
                  <i class="fas fa-chart-line pr-2"></i>
                  {{ $t('views.stats.view_chart') }}
                </b-button>
              </b-col>
            </b-row>
            <hr />
            <b-row class="align-items-center">
              <b-col>
                <div class="stats-label">{{ $t('views.stats.num_of_tx') }}</div>
              </b-col>
              <b-col>
                <div
                  class="my-1 text-right"
                >{{ totalStats.number_of_transactions | numberWithCommas }}</div>
              </b-col>
              <b-col cols="12" md="auto">
                <b-button class="btn-view-chart" size="sm" @click="goToCharts('tx')">
                  <i class="fas fa-chart-line pr-2"></i>
                  {{ $t('views.stats.view_chart') }}
                </b-button>
              </b-col>
            </b-row>
            <hr />
            <b-row class="align-items-center">
              <b-col>
                <div class="stats-label">{{ $t('views.stats.total_output_vol') }}</div>
              </b-col>
              <b-col>
                <div
                  class="my-1 text-right"
                >{{ totalStats.outputs_volume | numberWithCommas({decimal: 8}) }} ECOC</div>
              </b-col>
              <b-col cols="12" md="auto">
                <b-button class="btn-view-chart" size="sm" @click="goToCharts('output')">
                  <i class="fas fa-chart-line pr-2"></i>
                  {{ $t('views.stats.view_chart') }}
                </b-button>
              </b-col>
            </b-row>
            <hr />
            <b-row class="align-items-center">
              <b-col>
                <div class="stats-label">{{ $t('views.stats.est_tx_vol') }}</div>
              </b-col>
              <b-col>
                <div class="my-1 text-right"></div>
              </b-col>
              <b-col cols="12" md="auto">
                <div class="mt-1 mb-3 mb-md-1 text-center"></div>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">{{ $t('views.stats.stake_diffi') }}</h3>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row class="align-items-center">
              <b-col>
                <div class="stats-label">{{ $t('views.stats.difficulty') }}</div>
              </b-col>
              <b-col>
                <div class="my-1 text-right">{{ totalStats.difficulty | numberWithCommas }}</div>
              </b-col>
              <b-col cols="12" md="auto">
                <b-button class="btn-view-chart" size="sm" @click="goToCharts('difficulty')">
                  <i class="fas fa-chart-line pr-2"></i>
                  {{ $t('views.stats.view_chart') }}
                </b-button>
              </b-col>
            </b-row>
            <hr />
            <b-row class="align-items-center">
              <b-col>
                <div class="stats-label">{{ $t('views.stats.percent_staked') }}</div>
              </b-col>
              <b-col>
                <div class="my-1 text-right">{{ totalStats.stake | numberWithCommas }} %</div>
              </b-col>
              <b-col cols="12" md="auto">
                <b-button class="btn-view-chart" size="sm" @click="goToCharts('stake')">
                  <i class="fas fa-chart-line pr-2"></i>
                  {{ $t('views.stats.view_chart') }}
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import statisticsModule from '@/api/statistics/index'
// eslint-disable-next-line no-unused-vars
import { Total } from '../api/statistics/type'

@Component({})
export default class Stats extends Vue {
  totalStats: Total = {} as Total

  async mounted() {
    this.totalStats = await statisticsModule.getTotalStats()
  }

  goToCharts(path: string) {
    switch (path) {
      case 'fees':
        this.$router.push({
          name: 'charts',
          params: { type: this.$t('components.chart_selector.fees').toString() }
        })
        break
      case 'tx':
        this.$router.push({
          name: 'charts',
          params: { type: this.$t('components.chart_selector.tx').toString() }
        })
        break
      case 'output':
        this.$router.push({
          name: 'charts',
          params: { type: this.$t('components.chart_selector.outputs').toString() }
        })
        break
      case 'difficulty':
        this.$router.push({
          name: 'charts',
          params: { type: this.$t('components.chart_selector.difficulty').toString() }
        })
        break
      case 'stake':
        this.$router.push({
          name: 'charts',
          params: { type: this.$t('components.chart_selector.stakes').toString() }
        })
        break
    }
  }
}
</script>

<style lang="scss" scoped>
.group-head {
  h2::first-letter {
    color: $purple;
    font-weight: bold;
  }
}

.stats-label {
  font-weight: 600;
}

.btn-view-chart {
  color: $purple;
  border-color: $purple;
  border-radius: 4px;

  &:focus {
    box-shadow: 0 0 0 0.1rem rgba($purple, 0.3);
  }

  &:hover {
    background-color: rgba($purple, 0.6) !important;
    box-shadow: none;
    color: $white !important;
  }
}

@media (max-width: 767px) {
  .btn-view-chart {
    display: block !important;
    width: 100% !important;
    margin-top: 1.2rem !important;
  }
}

@media (max-width: 515px) {
  .block-global {
    font-size: 14px;
  }
}

@media (max-width: 408px) {
  .block-global {
    font-size: 13px;
  }
}
</style>
