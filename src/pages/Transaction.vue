<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">
              <span>T</span>ransaction
            </h2>
            <p class="my-0 text-truncate">
              TRANSACTION:
              <span class="text-purple">{{ tx.txid }}</span>
            </p>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">Summary</h3>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row>
              <b-col cols="6">
                <div class="my-1">Size</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right text-truncate">{{ tx.size }} (bytes)</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1">Received Time</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right text-truncate">{{ tx.time | timeFormat('LLLTS') }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1">Mined Time</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right text-truncate">{{ tx.blocktime | timeFormat('LLLTS')}}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1">Included in Block</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right text-truncate">
                  <router-link to="/block" class="d-block text-truncate">{{ tx.blockhash }}</router-link>
                </div>
              </b-col>
              <b-col cols="6" v-if="tx.isCoinBase">
                <div class="my-1">Coinbase</div>
              </b-col>
              <b-col cols="6" v-if="tx.isCoinBase">
                <div class="my-1 text-right text-truncate">{{ tx.vin[0].coinbase }}</div>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12" v-if="'txid' in tx">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">Details</h3>
          </div>

          <TransactionBox :tx="tx" :txPage="true"></TransactionBox>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TransactionBox from '@/components/TransactionBox.vue'
import txModule from '@/api/transaction/index'
// eslint-disable-next-line no-unused-vars
import { Tx } from '../api/transaction/type'

@Component({
  components: {
    TransactionBox
  }
})
export default class Transaction extends Vue {
  @Prop() hash!: string

  tx: Tx = {} as Tx

  async mounted() {
    this.tx = await txModule.getTransactionByHash(this.hash)
  }
}
</script>
