<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">{{ $t('views.token.token_tracker_summary') }}</h2>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">{{ $t('views.token.total_supply') }}:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      {{ summary.total_supply | numberWithCommas(8) }} BCST
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">{{ $t('views.token.name') }}:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ summary.name }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">{{ $t('views.token.token_holders') }}:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ summary.holders_count }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1" id="my-address">{{ $t('views.token.contract_addr') }}:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      <i
                        :class="hovered ? 'fas fa-copy copy-i' : 'far fa-copy copy-i'"
                        @mouseover="toggleCopyMessage(true, false)"
                        @mouseout="toggleCopyMessage(false, false)"
                        @click="toggleCopyMessage(true, true)"
                        v-b-tooltip.hover
                        :title="copyMessage"
                      ></i>
                      <router-link to="/address" class="text-truncate">{{
                        summary.contract_address
                      }}</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">{{ $t('views.token.num_of_transfers') }}:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      {{ summary.transfers_count | numberWithCommas }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1">{{ $t('views.token.token_decimal') }}:</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ summary.decimals }}</div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12">
          <b-tabs nav-class="tabs-global text-uppercase">
            <b-tab :title="$t('views.token.token_transfers')" active>
              <div class="block-global p-3 my-0 rounded-lg">
                <i18n path="views.token.total_of_transfer" tag="p">
                  <template v-slot:transfers>
                    <span class="text-green">{{ transfer.count }}</span>
                  </template>
                </i18n>
                <div class="table-responsive m-0">
                  <b-table dark :items="transfer.items" :fields="transferFields">
                    <template v-slot:cell(tx_hash)="data">
                      <router-link
                        :to="{ name: 'transaction', params: { hash: data.item.tx_hash } }"
                        >{{ data.item.tx_hash }}</router-link
                      >
                    </template>
                    <template v-slot:cell(from)="data">
                      <router-link :to="{ name: 'address', params: { addr: data.item.from } }">{{
                        data.item.from
                      }}</router-link>
                    </template>
                    <template v-slot:cell(to)="data">
                      <router-link :to="{ name: 'address', params: { addr: data.item.to } }">{{
                        data.item.to
                      }}</router-link>
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
              <!-- END .block-global -->
            </b-tab>
            <b-tab :title="$t('views.token.token_holders')">
              <div class="block-global p-3 my-0 rounded-lg">
                <i18n path="views.token.total_of_holders" tag="p">
                  <template v-slot:holders>
                    <span class="text-green">{{ holder.count }}</span>
                  </template>
                </i18n>
                <div class="table-responsive m-0">
                  <b-table dark :items="holder.items" :fields="holderFields">
                    <template v-slot:cell(rank)="data">{{
                      holder.offset + data.index + 1
                    }}</template>
                    <template v-slot:cell(percentage)="data"
                      >{{ calculatePercentage(summary.total_supply, data.item.amount) }}%</template
                    >
                    <template v-slot:cell(address)="data">
                      <router-link :to="{ name: 'address', params: { addr: data.item.address } }">{{
                        data.item.address
                      }}</router-link>
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
              <!-- END .block-global -->
            </b-tab>
            <b-tab :title="$t('views.token.read_smart_contract')">
              <div class="block-global p-3 my-0 rounded-lg">
                <b-row class="align-items-center">
                  <b-col cols="auto">1. {{ $t('views.token.name') }}</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto">{{ summary.name }}</b-col>
                  <b-col cols="auto" class="text-purple-light">string</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">2. {{ $t('views.token.total_supply') }}</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto">{{ summary.total_supply }}</b-col>
                  <b-col cols="auto" class="text-purple-light">uint256</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">3. {{ $t('views.token.decimals') }}</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0">{{
                      summary.decimals
                    }}</b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto">8</b-col>
                  <b-col cols="auto" class="text-purple-light">uint8</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">4. {{ $t('views.token.version') }}</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0">{{
                      summary.version
                    }}</b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto" class="text-purple-light">string</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">5. {{ $t('views.token.balance_of') }}</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="12" md="auto">
                    <b-input-group size="sm">
                      <b-form-input placeholder="_owner (address)"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="primary">Query</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12">
                    <div class="block-line">
                      <div class="my-2">
                        Balance
                        <span class="text-purple-light">uint256</span>
                      </div>
                      <div class="my-2">
                        <div>[ balanceOf method Response ]</div>
                        <b-row class="align-items-center no-gutters">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                          <b-col cols="auto" class="pr-1">
                            balance
                            <span class="text-purple-light">uint256</span> 0
                          </b-col>
                          <b-col cols="auto" class="d-block text-truncate"
                            >[ Owner address: 0abd9012fc9495d94346cbaded83f9e33be2ae07 ]</b-col
                          >
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">6. {{ $t('views.token.symbol') }}</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="auto">{{ summary.symbol }}</b-col>
                  <b-col cols="auto" class="text-purple-light">string</b-col>
                </b-row>
                <hr class="my-3" />
                <b-row class="align-items-center">
                  <b-col cols="auto">7. {{ $t('views.token.allowance') }}</b-col>
                  <b-col cols="auto">
                    <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                  </b-col>
                  <b-col cols="12" md="auto">
                    <b-input-group size="sm">
                      <b-form-input placeholder="_owner (address)"></b-form-input>
                      <b-form-input placeholder="_spender (address)"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="primary">Query</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col cols="12">
                    <div class="block-line">
                      <div class="my-2">
                        Remaining
                        <span class="text-purple-light">uint256</span>
                      </div>
                      <div class="my-2">
                        <div>[ balanceOf method Response ]</div>
                        <b-row class="align-items-center no-gutters">
                          <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                          <b-col cols="auto" class="pr-1">
                            balance
                            <span class="text-purple-light">uint256</span> 0
                          </b-col>
                          <b-col cols="auto" class="d-block text-truncate"
                            >[ Owner address: 0abd9012fc9495d94346cbaded83f9e33be2ae07 ]</b-col
                          >
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ecrc20Module from '@/api/ecrc20/index'
import { timeFromNow, numberWithCommas } from '@/api/filters'
// eslint-disable-next-line no-unused-vars
import { TokenSummary, TokenTransfers, TokenHolders } from '../api/ecrc20/type'

@Component
export default class Token extends Vue {
  @Prop() addr!: string

  summary: TokenSummary = {} as TokenSummary
  transfer: TokenTransfers = {} as TokenTransfers
  holder: TokenHolders = {} as TokenHolders

  transferFields: any[] = []
  holderFields: any[] = []

  rows = 100
  nowLimit = 20
  currentPage = 1
  hovered = false
  clicked = false

  created() {
    this.transferFields = [
      { key: 'tx_hash', label: this.$t('views.token.tx_hash') },
      {
        key: 'tx_time',
        label: this.$t('views.token.age'),
        formatter: (value: number) => {
          return timeFromNow(value * 1000)
        }
      },
      { key: 'from', label: this.$t('views.token.from') },
      { key: 'to', label: this.$t('views.token.to') },
      {
        key: 'value',
        label: this.$t('views.token.quantity'),
        formatter: (value: string) => {
          return numberWithCommas(Number(value), 8)
        }
      }
    ]

    this.holderFields = [
      { key: 'rank', label: this.$t('views.token.rank') },
      { key: 'address', label: this.$t('views.token.addr') },
      {
        key: 'amount',
        label: this.$t('views.token.quantity'),
        formatter: (value: string) => {
          return numberWithCommas(Number(value), 8)
        }
      },
      {
        key: 'percentage',
        label: this.$t('views.token.percent')
      }
    ]
  }

  async mounted() {
    console.log('sent prop addr', this.addr)

    this.summary = await ecrc20Module.getTokenSummary(this.addr)
    this.transfer = await ecrc20Module.getTokenTransfers({
      contractAddr: this.addr,
      limit: 20,
      offset: 0
    })

    this.holder = await ecrc20Module.getTokenHolders({
      contractAddr: this.addr,
      limit: 20,
      offset: 0
    })
  }

  get copyMessage() {
    return this.hovered && this.clicked ? 'Copied' : 'Copy to clipboard'
  }

  async transferPageChange(page: number) {
    this.transfer = await ecrc20Module.getTokenTransfers({
      contractAddr: this.addr,
      limit: 20,
      offset: this.transfer.limit * (page - 1)
    })
  }

  async holderPageChange(page: number) {
    this.holder = await ecrc20Module.getTokenHolders({
      contractAddr: this.addr,
      limit: 20,
      offset: this.holder.limit * (page - 1)
    })
  }

  calculatePercentage(total: string, val: string) {
    const currentVal = Number(val) / Math.pow(10, 8)
    const totalVal = Number(total) / Math.pow(10, 8)
    return ((currentVal / totalVal) * 100).toLocaleString()
  }

  toggleCopyMessage(hover: boolean, click: boolean) {
    this.hovered = hover
    this.clicked = click

    if (hover && click) {
      this.copyAddress()
    }
  }

  copyAddress() {
    const el = document.createElement('textarea')
    el.value = this.summary.contract_address
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}
</script>

<style lang="scss" scoped>
.copy-i {
  margin-right: 1rem;
  cursor: pointer;
}

.group-head {
  h2::first-letter {
    color: $purple;
    font-weight: bold;
  }
}
</style>
