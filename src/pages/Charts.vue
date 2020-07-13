<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left text-jus">
            <h2 class="head-page mb-1">{{ $t('views.charts.charts') }}</h2>
          </div>
          <ChartSelector></ChartSelector>
        </b-col>
        <b-col cols="12">
          <h3 class="head-global my-3">Rich List</h3>
          <div class="block-global p-3 mb-3 rounded-lg" v-if="!isMobileDevice">
            <div class="table-responsive">
              <b-table
                dark
                show-empty
                :items="balanceInterval"
                :fields="fields"
                class="balance-interval-table"
              >
                <template v-slot:empty>
                  <div class="table-no-record">
                    <i class="far fa-tired"></i>
                    <p>{{ $t('dom.table.no_records') }}</p>
                  </div>
                </template>
                <template v-slot:cell(percentAddresses)="data">
                  {{ data.item.percentAddresses.toFixed(2) }}%
                  <span
                    class="percent-total"
                  >[{{ data.item.percentAddressesTotal.toFixed(2) }}%]</span>
                </template>
                <template v-slot:cell(percentCoins)="data">
                  {{ data.item.percentCoins.toFixed(2) }}%
                  <span
                    class="percent-total"
                  >[{{ data.item.percentCoinsTotal.toFixed(2) }}%]</span>
                </template>
              </b-table>
            </div>
          </div>
          <div v-else>
            <balance-list-card
              v-for="(balance, index) in balanceInterval"
              :key="index"
              :balance="balance"
            ></balance-list-card>
            <back-to-top-btn :visibleoffset="900"></back-to-top-btn>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import { Vue, Component, Watch } from 'vue-property-decorator'
import ChartSelector from '@/components/ChartSelector.vue'
import statisticsModule from '@/api/statistics/index'
import { BalanceIntervalsTable } from '../api/statistics/type'
import BackToTopBtn from '../components/BackToTopBtn.vue'
import BalanceListCard from '@/components/BalanceListCard.vue'

@Component({
  components: {
    ChartSelector,
    BalanceListCard,
    BackToTopBtn
  }
})
export default class Charts extends Vue {
  balanceInterval: BalanceIntervalsTable[] = []

  windowWidth = window.innerWidth
  isMobiled = false

  // Table part

  async mounted() {
    this.balanceInterval = await statisticsModule.getBalanceIntervalsTable()
  }

  get fields() {
    return [
      {
        key: 'balance',
        label: this.$t('views.charts.balance'),
        class: 'text-center',
        thClass: 'th-custom'
      },
      {
        key: 'addresses',
        label: this.$t('views.charts.addresses'),
        class: 'text-right',
        thClass: 'th-custom'
      },
      {
        key: 'percentAddresses',
        label: this.$t('views.charts.percent_address_total'),
        formatter: (value: any) => `${value.toFixed(2)} %`,
        class: 'text-right',
        thClass: 'th-custom'
      },
      {
        key: 'coins',
        label: this.$t('views.charts.coins'),
        class: 'text-right',
        thClass: 'th-custom text-center',
        formatter: (value: any) => {
          value = value.split(',').join('')
          return `${Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })} ECOC`
        }
      },
      {
        key: 'percentCoins',
        label: this.$t('views.charts.percent_coins_total'),
        formatter: (value: any) => `${value.toFixed(2)} %`,
        class: 'text-right',
        thClass: 'th-custom'
      }
    ]
  }

  get isMobileDevice() {
    return window.innerWidth <= 575
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

.percent-total {
  color: $purple;
  font-size: smaller;
}

.balance-interval-table {
  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 991px) {
    font-size: 11.5px;
  }
}
</style>
