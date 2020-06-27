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
                <div class="my-1">{{ $t('views.stats.block_minted') }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right">{{ totalStats.n_blocks_mined | numberWithCommas }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1">{{ $t('views.stats.time_blocks') }}</div>
              </b-col>
              <b-col cols="6">
                <div
                  class="my-1 text-right"
                >{{ totalStats.time_between_blocks | numberWithCommas }} secs</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1">{{ $t('views.stats.minted_ecoc') }}</div>
              </b-col>
              <b-col cols="6">
                <div
                  class="my-1 text-right"
                >{{ totalStats.mined_currency_amount | numberWithCommas(8) }} ECOC</div>
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
                <div class="my-1">{{ $t('views.stats.total_tx_fee') }}</div>
              </b-col>
              <b-col>
                <div
                  class="my-1 text-right"
                >{{ totalStats.transaction_fees | numberWithCommas(8) }} ECOC</div>
              </b-col>
              <b-col cols="12" md="auto">
                <div class="mt-1 mb-3 mb-md-1 text-center">
                  <router-link
                    :to="{ name: 'charts', params: { type: 'Fees'} }"
                    class="btn btn-sm btn-primary"
                  >{{ $t('views.stats.view_chart') }}</router-link>
                </div>
              </b-col>
            </b-row>
            <b-row class="align-items-center">
              <b-col>
                <div class="my-1">{{ $t('views.stats.num_of_tx') }}</div>
              </b-col>
              <b-col>
                <div
                  class="my-1 text-right"
                >{{ totalStats.number_of_transactions | numberWithCommas }}</div>
              </b-col>
              <b-col cols="12" md="auto">
                <div class="mt-1 mb-3 mb-md-1 text-center">
                  <router-link
                    :to="{ name: 'charts', params: { type: 'Transactions'} }"
                    class="btn btn-sm btn-primary"
                  >{{ $t('views.stats.view_chart') }}</router-link>
                </div>
              </b-col>
            </b-row>
            <b-row class="align-items-center">
              <b-col>
                <div class="my-1">{{ $t('views.stats.total_output_vol') }}</div>
              </b-col>
              <b-col>
                <div
                  class="my-1 text-right"
                >{{ totalStats.outputs_volume | numberWithCommas(8) }} ECOC</div>
              </b-col>
              <b-col cols="12" md="auto">
                <div class="mt-1 mb-3 mb-md-1 text-center">
                  <router-link
                    :to="{ name: 'charts', params: { type: 'Outputs'} }"
                    class="btn btn-sm btn-primary"
                  >{{ $t('views.stats.view_chart') }}</router-link>
                </div>
              </b-col>
            </b-row>
            <b-row class="align-items-center">
              <b-col>
                <div class="my-1">{{ $t('views.stats.est_tx_vol') }}</div>
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
                <div class="my-1">{{ $t('views.stats.difficulty') }}</div>
              </b-col>
              <b-col>
                <div class="my-1 text-right">{{ totalStats.difficulty | numberWithCommas }}</div>
              </b-col>
              <b-col cols="12" md="auto">
                <div class="mt-1 mb-3 mb-md-1 text-center">
                  <router-link
                    :to="{ name: 'charts', params: { type: 'Difficulty'} }"
                    class="btn btn-sm btn-primary"
                  >{{ $t('views.stats.view_chart') }}</router-link>
                </div>
              </b-col>
            </b-row>
            <b-row class="align-items-center">
              <b-col>
                <div class="my-1">{{ $t('views.stats.percent_staked') }}</div>
              </b-col>
              <b-col>
                <div class="my-1 text-right">{{ totalStats.stake | numberWithCommas }} %</div>
              </b-col>
              <b-col cols="12" md="auto">
                <div class="mt-1 mb-3 mb-md-1 text-center">
                  <router-link
                    :to="{ name: 'charts', params: { type: 'Stakes'} }"
                    class="btn btn-sm btn-primary"
                  >{{ $t('views.stats.view_chart') }}</router-link>
                </div>
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
}
</script>

<style lang="scss" scoped>
.group-head {
  h2::first-letter {
    color: $purple;
    font-weight: bold;
  }
}
</style>
