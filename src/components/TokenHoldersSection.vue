<template>
  <div class="block-global p-3 my-0 rounded-lg">
    <i18n path="views.token.total_of_holders" tag="p">
      <template v-slot:holders>
        <span class="text-green">{{ holder.count }}</span>
      </template>
    </i18n>
    <div v-if="!isMobileDevice">
      <div class="table-responsive m-0">
        <b-table
          class="token-holders-table"
          dark
          show-empty
          :items="holder.items"
          :fields="holderFields"
        >
          <template v-slot:empty>
            <div class="table-no-record">
              <i class="far fa-tired"></i>
              <p>{{ $t('dom.table.no_records') }}</p>
            </div>
          </template>
          <template v-slot:cell(rank)="data">{{ getTokenHoldersRanking(data.item) }}</template>
          <template
            v-slot:cell(percentage)="data"
          >{{ calculatePercentage(summary.total_supply, data.item.amount) }}%</template>
          <template v-slot:cell(address)="data">
            <router-link
              :to="{ name: 'address', params: { addr: data.item.address } }"
            >{{ data.item.address }}</router-link>
          </template>
        </b-table>
      </div>
      <div class="my-2 d-flex justify-content-center">
        <b-pagination
          class="pagination-dark"
          v-model="currentPage"
          :per-page="holder.limit"
          :total-rows="holder.count"
          @change="holderPageChange"
          size="sm"
        ></b-pagination>
      </div>
    </div>
    <div v-else>
      <token-holders-card :holders="holder" :addr="addr" :summary="summary"></token-holders-card>
      <back-to-top-btn></back-to-top-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ecrc20Module from '@/api/ecrc20/index'
import TokenHoldersCard from '@/components/TokenHoldersCard.vue'
import BackToTopBtn from '../components/BackToTopBtn.vue'
import { numberWithCommas } from '@/api/filters'
// eslint-disable-next-line no-unused-vars
import { TokenSummary, TokenHolders, TokenHolder } from '../api/ecrc20/type'

@Component({
  components: {
    TokenHoldersCard,
    BackToTopBtn
  }
})
export default class TokenHoldersSection extends Vue {
  @Prop() addr!: string
  @Prop() summary!: TokenSummary

  holder: TokenHolders = {} as TokenHolders

  nowLimit = 20
  currentPage = 1

  async mounted() {
    this.holder = await ecrc20Module.getTokenHolders({
      contractAddr: this.addr,
      limit: 20,
      offset: 0
    })
  }

  get holderFields() {
    return [
      {
        key: 'rank',
        label: this.$t('views.token.rank'),
        class: 'text-center',
        thClass: 'th-custom'
      },
      {
        key: 'address',
        label: this.$t('views.token.addr'),
        class: 'text-center',
        thClass: 'th-custom'
      },
      {
        key: 'amount',
        label: this.$t('views.token.quantity'),
        formatter: (value: string) => {
          return numberWithCommas(Number(value), { decimal: 8, fixed: 2 })
        },
        class: 'text-right',
        thClass: 'th-custom'
      },
      {
        key: 'percentage',
        label: this.$t('views.token.percent'),
        class: 'text-right',
        thClass: 'th-custom'
      }
    ]
  }

  get isMobileDevice() {
    return window.innerWidth <= 767
  }

  calculatePercentage(total: string, val: string) {
    const currentVal = Number(val) / Math.pow(10, 8)
    const totalVal = Number(total) / Math.pow(10, 8)
    return numberWithCommas((currentVal / totalVal) * 100, { fixed: 3 })
  }

  getTokenHoldersRanking(holder: TokenHolder) {
    let rankNum = this.holder.items.findIndex(el => el.address === holder.address)
    return this.holder.offset + rankNum + 1
  }

  async holderPageChange(page: number) {
    this.holder = await ecrc20Module.getTokenHolders({
      contractAddr: this.addr,
      limit: 20,
      offset: this.holder.limit * (page - 1)
    })
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 991px) {
  .token-holders-table {
    font-size: 14px;
  }
}
</style>
