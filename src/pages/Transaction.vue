<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">{{ $t('views.transaction.transaction') }}</h2>
            <p class="my-0 text-truncate text-uppercase">
              {{ $t('views.transaction.transaction') }}:
              <span class="text-purple">{{ tx.txid }}</span>
            </p>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">{{ $t('views.transaction.summary') }}</h3>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row>
              <b-col cols="6">
                <div class="my-1">{{ $t('views.transaction.size') }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right text-truncate">
                  {{ tx.size }} ({{ $t('views.transaction.bytes') }})
                </div>
              </b-col>
              <b-col cols="6">
                <div class="my-1">{{ $t('views.transaction.received_tm') }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right text-truncate">{{ tx.time | timeFormat('LLLTS') }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1">{{ $t('views.transaction.mined_tm') }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right text-truncate">
                  {{ tx.blocktime | timeFormat('LLLTS') }}
                </div>
              </b-col>
              <b-col cols="6">
                <div class="my-1">{{ $t('views.transaction.included_in_block') }}</div>
              </b-col>
              <b-col cols="6">
                <div class="my-1 text-right text-truncate">
                  <router-link to="/block" class="d-block text-truncate">{{
                    tx.blockhash
                  }}</router-link>
                </div>
              </b-col>
              <b-col cols="6" v-if="tx.isCoinBase">
                <div class="my-1">{{ $t('views.transaction.coinbase') }}</div>
              </b-col>
              <b-col cols="6" v-if="tx.isCoinBase">
                <div class="my-1 text-right text-truncate">{{ tx.vin[0].coinbase }}</div>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12" v-if="'txid' in tx">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">{{ $t('views.transaction.detail') }}</h3>
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

<style lang="scss" scoped>
.group-head {
  h2::first-letter {
    color: $purple;
    font-weight: bold;
  }
}

@media (max-width: 575px) {
  .block-global {
    font-size: 14px;
  }
}
</style>
