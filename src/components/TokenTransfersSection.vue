<template>
  <div class="block-global p-3 my-0 rounded-lg">
    <i18n path="views.token.total_of_transfer" tag="p">
      <template v-slot:transfers>
        <span class="text-green">{{ transfer.count }}</span>
      </template>
    </i18n>
    <div v-if="!isMobileDevice">
      <div class="table-responsive m-0">
        <b-table class="token-transfer-table" dark :items="transfer.items" :fields="transferFields">
          <template v-slot:cell(tx_hash)="data">
            <router-link
              :to="{ name: 'transaction', params: { hash: data.item.tx_hash } }"
            >{{ data.item.tx_hash }}</router-link>
          </template>
          <template v-slot:cell(fromto)="data">
            <div class="from-to-content">
              <div class="td-from-and-to">
                <router-link
                  :to="{ name: 'address', params: { addr: data.item.from } }"
                >{{ data.item.from }}</router-link>
              </div>
              <i class="fas fa-arrow-right tx-arrow"></i>
              <div class="td-from-and-to">
                <router-link
                  :to="{ name: 'address', params: { addr: data.item.to } }"
                >{{ data.item.to }}</router-link>
              </div>
            </div>
          </template>
        </b-table>
      </div>
      <div class="my-2 d-flex justify-content-center">
        <b-pagination
          class="pagination-dark"
          v-model="currentPage"
          :per-page="transfer.limit"
          :total-rows="transfer.count"
          @change="transferPageChange"
          size="sm"
        ></b-pagination>
      </div>
    </div>
    <div v-else>
      <token-transfer-card :transfer="transfer" :addr="addr"></token-transfer-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ecrc20Module from '@/api/ecrc20/index'
import TokenTransferCard from '@/components/TokenTransferCard.vue'
import { timeFromNow, numberWithCommas } from '@/api/filters'
// eslint-disable-next-line no-unused-vars
import { TokenTransfers } from '../api/ecrc20/type'

@Component({
  components: {
    TokenTransferCard
  }
})
export default class TokenTransfersSection extends Vue {
  @Prop() addr!: string

  transfer: TokenTransfers = {} as TokenTransfers
  transferFields: any[] = []
  nowLimit = 20
  currentPage = 1

  created() {
    this.transferFields = [
      {
        key: 'tx_hash',
        label: this.$t('views.token.tx_hash'),
        thClass: 'th-custom',
        tdClass: 'td-tx-hash'
      },
      {
        key: 'tx_time',
        label: this.$t('views.token.age'),
        formatter: (value: number) => {
          return timeFromNow(value * 1000)
        },
        sortable: true,
        thClass: 'th-custom',
        class: 'text-center'
      },
      {
        key: 'fromto',
        label: `Transfered to`,
        thClass: 'th-custom',
        class: 'text-center'
      },
      {
        key: 'value',
        label: this.$t('views.token.quantity'),
        formatter: (value: string) => {
          return numberWithCommas(Number(value), {decimal: 8})
        },
        sortable: true,
        thClass: 'th-custom',
        class: 'text-right'
      }
    ]
  }

  async mounted() {
    this.transfer = await ecrc20Module.getTokenTransfers({
      contractAddr: this.addr,
      limit: 20,
      offset: 0
    })
  }

  get isMobileDevice() {
    return window.innerWidth <= 767
  }

  async transferPageChange(page: number) {
    this.transfer = await ecrc20Module.getTokenTransfers({
      contractAddr: this.addr,
      limit: 20,
      offset: this.transfer.limit * (page - 1)
    })
  }
}
</script>

<style lang="scss" scoped>
.from-to-content {
  display: flex;
  justify-content: center;
}

.tx-arrow {
  margin: auto 0.6rem;
}

@media (max-width: 991px) {
  .token-transfer-table {
    font-size: 14px;
    .from-to-content {
      display: block;
      text-align: -webkit-center;
    }
  }

  .fa-arrow-right:before {
    content: '\f063' !important;
  }
}
</style>
