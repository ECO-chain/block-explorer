<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">
              <span>A</span>ddress
            </h2>
            <h4 class="my-0 text-truncate text-purple">{{ addr }}</h4>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">
              Summary
              <span class="small text-purple">[Confirmed]</span>
            </h3>
          </div>
          <b-card class="block-global mb-3 rounded-lg addr-balance-block">
            <b-row>
              <b-col>Balance</b-col>
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
                    <div class="my-1">Total Received</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right"
                    >{{ addressSummary.totalReceived | numberWithCommas }} ECOC</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Total Sent</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right"
                    >{{ addressSummary.totalSent | numberWithCommas }} ECOC</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">No. Transactions</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right"
                    >{{ addressSummary.txApperances | numberWithCommas }}</div>
                  </b-col>
                  <b-col cols="6" v-if="!isEcoAddr">
                    <div class="my-1">ECRC20 Token</div>
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
            <h3 class="head-global my-3">ECRC20 Token</h3>
          </div>
          <TokenTracker v-for="(balance, index) in tokenBalance" :key="index" :token="balance"></TokenTracker>
        </b-col>

        <b-col cols="12" v-if="!isEcoAddr">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">
              Storage
              <span class="small text-purple">[{{ getEntriesCount() }} entries]</span>
            </h3>
          </div>
          <StorageLog :entries="contractInfo.storage"></StorageLog>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">Transactions</h3>
          </div>
          <TransactionBox v-for="(tx, index) in txs.txs" :key="index" :tx="tx"></TransactionBox>
        </b-col>
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
    StorageLog
  }
})
export default class Address extends Vue {
  @Prop() addr!: string

  // address/tx subscribed
  @Socket('ecocd/addresstxid')
  async onNewTx(payload: any) {
    let tx = await txModule.getTransactionByHash(payload.txid)
    console.log('getting new tx', tx)
    this.txs.txs.unshift(tx)
  }

  addressSummary: AddressSummary = {} as AddressSummary
  tokenBalance: Tracker[] = []
  txs: Txs = {} as Txs
  tx: Tx = {} as Tx
  contractInfo: ContractInfo = {} as ContractInfo
  isEcoAddr = false
  address = ''

  async mounted() {
    this.address = this.addr
    this.isEcoAddr = await ecoweb3.isEcoAddress(this.address)

    if (!this.isEcoAddr) {
      console.log('contract addressed!')
      // if its not a eco this.address so it is meaning a given address is a contract address
      this.contractInfo = await contractModule.getTokenContractInfo(this.address)
      this.address = await ecoweb3.getBitAddressFromContractAddress(this.address)
    }

    this.addressSummary = await addressModule.getAddressSummary(this.address)
    this.tokenBalance = await ecrc20Module.getTokenTracker(this.address)
    this.txs = await txModule.getAddressTransactions(this.address)

    // subscribe tx to a socket
    console.log('subscribing address tx...')
    this.addressTxSubscription('subscribe', this.address)
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

  beforeDestroy() {
    // unsubscribe transaction
    console.log('unsubscribed', this.address)
    this.addressTxSubscription('unsubscribe', this.address)
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
</style>
