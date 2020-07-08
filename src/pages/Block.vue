<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page my-0">{{ $t('views.block.block') }} #{{ block.height }}</h2>
            <p class="my-0 text-truncate">
              <CopyBtn :target="block.hash" class="mr-2"></CopyBtn>
              {{ $t('views.block.block_hash') }}:
              <span class="text-purple">{{ block.hash }}</span>
            </p>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">
              {{ $t('views.block.summary') }}
              <span
                class="small text-purple"
              >[ {{ $t('views.block.confirm') }} ]</span>
            </h3>
          </div>
          <div class="block-global p-3 mb-3 rounded-lg">
            <b-row>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.num_tx') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.tx.length }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.difficulty') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right text-truncate"
                    >{{ block.difficulty | numberWithCommas }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.height') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      {{ block.height }}
                      <span class="text-green">[ Mainchain ]</span>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.bits') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.bits }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.block_reward') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.reward }} ECOC</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.size_b') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.size }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.time') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right text-truncate"
                    >{{ block.time | timeFormat('MMMM Do YYYY, h:mm:ss a') }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.version') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.version }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.mined_by') }}</div>
                  </b-col>
                  <b-col cols="6" class="my-1 text-right text-truncate">
                    <router-link
                      :to="{ name: 'address', params: { addr: block.minedBy } }"
                    >{{ block.minedBy }}</router-link>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.nonce') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ block.nonce }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.merkle') }}</div>
                  </b-col>
                  <b-col cols="6" class="d-flex align-items-baseline">
                    <CopyBtn :target="block.merkleroot" class="mr-2"></CopyBtn>
                    <div class="my-1 text-right text-truncate">{{ block.merkleroot }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.prev_block') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      <router-link
                        :to="{ name: 'block', params: { hash: block.previousblockhash } }"
                      >{{ block.height - 1 }}</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6" v-if="'nextblockhash' in block">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 summary-label">{{ $t('views.block.next_block') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      <router-link
                        :to="{ name: 'block', params: { hash: block.nextblockhash } }"
                      >{{ block.height + 1 }}</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h3 class="head-global my-3">{{ $t('views.block.tx') }}</h3>
          </div>

          <TransactionBox v-for="(tx, index) in txs.txs" :key="index" :tx="tx" :txPage="false"></TransactionBox>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import blocksModule from '@/api/blocks/index'
import txModule from '@/api/transaction/index'
import TransactionBox from '@/components/TransactionBox.vue'
import CopyBtn from '@/components/CopyBtn.vue'
// eslint-disable-next-line no-unused-vars
import { BlockDetail } from '../api/blocks/type'
// eslint-disable-next-line no-unused-vars
import { Txs } from '../api/transaction/type'

@Component({
  components: {
    TransactionBox,
    CopyBtn
  }
})
export default class Block extends Vue {
  @Prop() hash!: string

  block: BlockDetail = {} as BlockDetail
  txs: Txs = {} as Txs

  async mounted() {
    this.initBlockData()
  }

  async initBlockData() {
    this.block = await blocksModule.getBlockDetail(this.hash)
    this.txs = await txModule.getBlockTransactions(this.block.hash)

    // console.log('block', this.block)
    // console.log('txs', this.txs)
  }

  @Watch('hash')
  async onHashChanged() {
    this.initBlockData()
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

.summary-label {
  font-weight: 600;
}

@media (max-width: 575px) {
  .block-global {
    font-size: 14px;
  }
}
</style>
