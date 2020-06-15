<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">
              <span>A</span>ddress
            </h2>
            <h4 class="my-0 text-truncate text-purple">{{ addressSummary.addrStr }}</h4>
          </div>
          <!-- END .group-head -->
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
                    <div class="my-1 text-right">{{ addressSummary.totalReceived | numberWithCommas }} ECOC</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Total Sent</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ addressSummary.totalSent | numberWithCommas }} ECOC</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">No. Transactions</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">{{ addressSummary.txApperances | numberWithCommas }}</div>
                  </b-col>
                  <b-col cols="6" v-if="isTokenAddr(addressSummary.addrStr)">
                    <div class="my-1">ECRC20 Token</div>
                  </b-col>
                  <b-col cols="6" v-if="isTokenAddr(addressSummary.addrStr)">
                    <div class="my-1 text-right">
                      <router-link to="/token">BCST</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="auto">
                <VueQrcode class="qr" :value="addressSummary.addrStr" :options="{ color: { dark: '#803D9E', light: '#0e111b' }, width: 125 }"></VueQrcode>
                <!-- <div class="mt-2 mt-md-0 w-125px">
                  <img alt="QR" src="~@/assets/images/qr-sample.png" />
                </div> -->
              </b-col>

              <b-col cols="12" v-if="isTokenAddr(addressSummary.addrStr)">
                <hr class="mb-0"/>
                <TxScriptLog></TxScriptLog>
              </b-col>

            </b-row>
          </div>
        </b-col>

        <b-col cols="12" v-if="tokenBalance.length > 0 && !isTokenAddr(addressSummary.addrStr)">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">ECRC20 Token</h3>
          </div>
          <TokenTracker></TokenTracker>
        </b-col>

        <b-col cols="12" v-if="isTokenAddr(addressSummary.addrStr)">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">
              Storage
              <span class="small text-purple">[66 entries]</span>
            </h3>
          </div>
          <StorageLog></StorageLog>
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import TokenTracker from '@/components/TokenTracker.vue'
import TransactionBox from '@/components/TransactionBox.vue'
import TxScriptLog from '@/components/TxScriptLog.vue'
import StorageLog from '@/components/StorageLog.vue'
import addressModule from '@/api/address/index'
import ecrc20Module from  '@/api/ecrc20/index'
import txModule from '@/api/transaction/index'
// eslint-disable-next-line no-unused-vars
import { AddressSummary } from '../api/address/type'
// eslint-disable-next-line no-unused-vars
import { TokenTracker as Tracker } from '../api/ecrc20/type'
// eslint-disable-next-line no-unused-vars
import { Txs } from '../api/transaction/type'

@Component({
  components: {
    VueQrcode,
    TokenTracker,
    TransactionBox,
    TxScriptLog,
    StorageLog
  }
})
export default class Address extends Vue {
  @Prop() addr!: string

  addressSummary: AddressSummary = {} as AddressSummary
  tokenBalance: Tracker[] = []
  txs: Txs = {} as Txs

  async mounted() {
    this.addressSummary = await addressModule.getAddressSummary(this.addr)
    if (!this.isTokenAddr(this.addr)) {
      this.tokenBalance = await ecrc20Module.getTokenTracker(this.addr)
    }
    this.txs = await txModule.getAddressTransactions(this.addr)
  }

  isTokenAddr(addr: string) {
    return addr === '0abd9012fc9495d94346cbaded83f9e33be2ae07'
  }

  beforeDestroy() {
    // unsubscribe transaction
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
