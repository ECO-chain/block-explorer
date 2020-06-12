<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">
              <span>A</span>ddress
            </h2>
            <h4 class="my-0 text-truncate text-purple">0abd9012fc9495d94346cbaded83f9e33be2ae07</h4>
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
                0.23215115
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
                    <div class="my-1 text-right">0 ECOC</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">Total Sent</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">0 ECOC</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1">No. Transactions</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right">2623</div>
                  </b-col>
                  <b-col cols="6" v-if="isTokenAddr">
                    <div class="my-1">ECRC20 Token</div>
                  </b-col>
                  <b-col cols="6" v-if="isTokenAddr">
                    <div class="my-1 text-right">
                      <router-link to="/token">BCST</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="auto">
                <div class="mt-2 mt-md-0 w-125px">
                  <img alt="QR" src="~@/assets/images/qr-sample.png" />
                </div>
              </b-col>

              <b-col cols="12" v-if="isTokenAddr">
                <hr class="mb-0"/>
                <TxScriptLog></TxScriptLog>
              </b-col>

            </b-row>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">ECRC20 Token</h3>
          </div>
          <TokenTracker></TokenTracker>
        </b-col>

        <b-col cols="12">
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

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import TokenTracker from '@/components/TokenTracker.vue'
import TransactionBox from '@/components/TransactionBox.vue'
import TxScriptLog from '@/components/TxScriptLog.vue'
import StorageLog from '@/components/StorageLog.vue'

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


  isTokenAddr(hash: string) {
    return hash === '0abd9012fc9495d94346cbaded83f9e33be2ae07'
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
</style>
