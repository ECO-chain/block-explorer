<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">{{ $t('views.address.address') }}</h2>
            <h4 class="my-0 text-truncate text-purple">{{ addr }}</h4>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">
              {{ $t('views.address.summary') }}
              <span
                class="small text-purple"
              >[{{ $t('views.address.confirm') }}]</span>
            </h3>
          </div>
          <b-card class="block-global mb-3 rounded-lg addr-balance-block">
            <b-row>
              <b-col>{{ $t('views.address.balance') }}</b-col>
              <b-col class="text-right addr-balance">
                {{ addressSummary.balance | numberWithCommas }}
                <span>ECOC</span>
              </b-col>
            </b-row>
          </b-card>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row class="justify-content-center">
              <b-col cols="12" md>
                <b-row class="align-items-center">
                  <b-col cols="6">
                    <div class="my-1">{{ $t('views.address.total_received') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right"
                    >{{ addressSummary.totalReceived | numberWithCommas }} ECOC</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">{{ $t('views.address.total_sent') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right"
                    >{{ addressSummary.totalSent | numberWithCommas }} ECOC</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">{{ $t('views.address.num_of_tx') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right"
                    >{{ addressSummary.txApperances | numberWithCommas }}</div>
                  </b-col>
                  <b-col cols="6" v-if="!isEcoAddr">
                    <div class="my-1">{{ $t('views.address.ecrc_token') }}</div>
                  </b-col>
                  <b-col cols="6" v-if="!isEcoAddr">
                    <div class="my-1 text-right">
                      <router-link to="/token">BCST</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="auto">
                <VueQrcode
                  class="qr"
                  :value="toQRCodeFormat(addressSummary.addrStr)"
                  :options="{ color: { dark: '#803D9E', light: '#0e111b' }, width: 125 }"
                ></VueQrcode>
              </b-col>

              <b-col cols="12" v-if="!isEcoAddr">
                <hr class="mb-0" />
                <TokenScriptLog :isToken="true" :byteCode="contractInfo.code"></TokenScriptLog>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12" v-if="tokenBalance.length > 0 && isEcoAddr">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">{{ $t('views.address.ecrc_token') }}</h3>
          </div>
          <TokenTracker v-for="(balance, index) in tokenBalance" :key="index" :token="balance"></TokenTracker>
        </b-col>

        <b-col cols="12" v-if="!isEcoAddr">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">
              {{ $t('views.address.storage') }}
              <span
                class="small text-purple"
              >[{{ getEntriesCount() }} {{ $t('views.address.entries') }}]</span>
            </h3>
          </div>
          <StorageLog :entries="contractInfo.storage"></StorageLog>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">{{ $t('views.address.tx') }}</h3>
          </div>
          <TransactionBox v-for="(tx, index) in txs.txs" :key="index" :tx="tx"></TransactionBox>
          <infinite-loading v-if="txs.txs.length" @infinite="infiniteHandler"></infinite-loading>
        </b-col>
        <back-to-top-btn :visisbleoffset="980"></back-to-top-btn>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import { Vue, Component, Prop } from 'vue-property-decorator'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import TokenTracker from '@/components/TokenTracker.vue'
import TransactionBox from '@/components/TransactionBox.vue'
import TokenScriptLog from '@/components/TokenScriptLog.vue'
import StorageLog from '@/components/StorageLog.vue'
import addressModule from '@/api/address/index'
import ecrc20Module from '@/api/ecrc20/index'
import txModule from '@/api/transaction/index'
import contractModule from '@/api/contracts/index'
import ecoweb3 from '@/ecoweb3/index'
import InfiniteLoading from 'vue-infinite-loading'
import BackToTopBtn from '../components/BackToTopBtn.vue'

import { Socket } from 'vue-socket.io-extended'
import { AddressSummary } from '../api/address/type'
import { TokenTracker as Tracker } from '../api/ecrc20/type'
import { Txs, Tx } from '../api/transaction/type'
import { ContractInfo } from '../api/contracts/type'

@Component({
  components: {
    VueQrcode,
    TokenTracker,
    TransactionBox,
    TokenScriptLog,
    StorageLog,
    InfiniteLoading,
    BackToTopBtn
  }
})
export default class Address extends Vue {
  @Prop() addr!: string

  // address/tx subscribed
  @Socket('ecocd/addresstxid')
  async onNewTx(payload: any) {
    let tx = await txModule.getTransactionByHash(payload.txid)
    this.txs.txs.unshift(tx)
  }

  addressSummary: AddressSummary = {} as AddressSummary
  tokenBalance: Tracker[] = []
  txs: Txs = {} as Txs
  tx: Tx = {} as Tx
  contractInfo: ContractInfo = {} as ContractInfo
  isEcoAddr = false
  address = ''
  page = 0

  async mounted() {
    this.address = this.addr
    this.isEcoAddr = await ecoweb3.isEcoAddress(this.address)

    if (!this.isEcoAddr) {
      // if its not a eco this.address so it is meaning a given address is a contract address
      this.contractInfo = await contractModule.getTokenContractInfo(this.address)
      this.address = await ecoweb3.getBitAddressFromContractAddress(this.address)
    }

    this.addressSummary = await addressModule.getAddressSummary(this.address)
    this.tokenBalance = await ecrc20Module.getTokenTracker(this.address)
    this.txs = await txModule.getAddressTransactions({ hash: this.address, pageNum: this.page })
    this.page++
    // subscribe tx to a socket
    this.addressTxSubscription('subscribe', this.address)
  }

  beforeDestroy() {
    // unsubscribe transaction
    console.log('unsubscribed', this.address)
    this.addressTxSubscription('unsubscribe', this.address)
  }

  addressTxSubscription(action: string, address: string) {
    if (['subscribe', 'unsubscribe'].includes(action)) {
      this.$socket.client.emit(action, 'ecocd/addresstxid', [address])
    }
  }

  toQRCodeFormat(addr: string) {
    return `ecoc:${addr}?label=ECOC Mobile Wallet`
  }

  getEntriesCount() {
    return Object.keys(this.contractInfo.storage).length
  }

  async infiniteHandler($state: any) {
    if (this.page < this.txs.pagesTotal) {
      let moreTxs: Txs = await txModule.getAddressTransactions({
        hash: this.address,
        pageNum: this.page
      })

      setTimeout(() => {
        // this.txs.txs.concat(moreTxs.txs)
        for (let tx of moreTxs.txs) {
          this.txs.txs.push(tx)
        }
        // document.documentElement.scrollTop = currentScroll
        $state.loaded()
        this.page++
      }, 1000)
    } else {
      $state.complete()
    }
  }
}
</script>

<style lang="scss" scoped>
.addr-balance-block {
  font-weight: 600;
  text-transform: uppercase;

  .addr-balance {
    span {
      color: #803e9d;
    }
  }
}

.qr {
  border-radius: 8px;
}

.group-head {
  h2::first-letter {
    color: $purple;
    font-weight: bold;
  }
}
</style>
