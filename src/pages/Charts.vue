<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">{{ $t('views.charts.charts') }}</h2>
          </div>
          <ChartSelector></ChartSelector>
        </b-col>
        <b-col cols="12">
          <h3 class="head-global my-3">Rich List</h3>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-table dark :items="balanceInterval" :fields="fields">
              <template
                v-slot:cell(percentAddresses)="data"
              >{{ data.item.percentAddresses.toFixed(2) }}% [{{ data.item.percentAddressesTotal.toFixed(2) }}%]</template>
              <template
                v-slot:cell(percentCoins)="data"
              >{{ data.item.percentCoins.toFixed(2) }}% [{{ data.item.percentCoinsTotal.toFixed(2) }}%]</template>
            </b-table>
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

@Component({
  components: {
    ChartSelector
  }
})
export default class Charts extends Vue {
  balanceInterval: BalanceIntervalsTable[] = []

  fields: any[] = []

  // Table part
  created() {
    this.fields = [
      { key: 'balance', label: this.$t('views.charts.balance'), sortable: true },
      { key: 'addresses', label: this.$t('views.charts.addresses'), sortable: true },
      {
        key: 'percentAddresses',
        label: this.$t('views.charts.percent_address_total'),
        sortable: true,
        formatter: (value: any) => `${value.toFixed(2)} %`
      },
      {
        key: 'coins',
        label: this.$t('views.charts.coins'),
        sortable: true
      },
      {
        key: 'percentCoins',
        label: this.$t('views.charts.percent_coins_total'),
        sortable: true,
        formatter: (value: any) => `${value.toFixed(2)} %`
      }
    ]
  }

  async mounted() {
    this.balanceInterval = await statisticsModule.getBalanceIntervalsTable()

    console.log('balance interval', this.balanceInterval)
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
