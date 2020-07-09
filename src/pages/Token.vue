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
          <div class="block-global p-3 mb-3 rounded-lg token-summary">
            <b-row>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 token-label">{{ $t('views.token.total_supply') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right text-truncate"
                    >{{ summary.total_supply | numberWithCommas({decimal: 8}) }} BCST</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 token-label">{{ $t('views.token.name') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ summary.name }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 token-label">{{ $t('views.token.token_holders') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">{{ summary.holders_count }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div
                      class="my-1 token-label"
                      id="my-address"
                    >{{ $t('views.token.contract_addr') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div class="my-1 text-right text-truncate">
                      <CopyBtn class="mr-2" :target="summary.contract_address"></CopyBtn>
                      <router-link
                        :to="{ name: 'address', params: { addr: summary.contract_address } }"
                        class="text-truncate"
                      >{{ summary.contract_address }}</router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 token-label">{{ $t('views.token.num_of_transfers') }}</div>
                  </b-col>
                  <b-col cols="6">
                    <div
                      class="my-1 text-right text-truncate"
                    >{{ summary.transfers_count | numberWithCommas }}</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="12" md="6">
                <b-row>
                  <b-col cols="6">
                    <div class="my-1 token-label">{{ $t('views.token.token_decimal') }}</div>
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
              <TokenTransfersSection :addr="addr"></TokenTransfersSection>
            </b-tab>

            <b-tab :title="$t('views.token.token_holders')">
              <TokenHoldersSection :addr="addr" :summary="summary"></TokenHoldersSection>
            </b-tab>

            <b-tab :title="$t('views.token.read_smart_contract')">
              <ReadContractSection :summary="summary"></ReadContractSection>
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
import TokenTransfersSection from '@/components/TokenTransfersSection.vue'
import TokenHoldersSection from '@/components/TokenHoldersSection.vue'
import ReadContractSection from '@/components/ReadContractSection.vue'
import CopyBtn from '@/components/CopyBtn.vue'
// eslint-disable-next-line no-unused-vars
import { TokenSummary, TokenHolders, TokenHolder } from '../api/ecrc20/type'

@Component({
  components: {
    TokenTransfersSection,
    TokenHoldersSection,
    ReadContractSection,
    CopyBtn
  }
})
export default class Token extends Vue {
  @Prop() addr!: string

  summary: TokenSummary = {} as TokenSummary

  hovered = false
  clicked = false

  async mounted() {
    // console.log('sent prop addr', this.addr)
    this.summary = await ecrc20Module.getTokenSummary(this.addr)
  }

  get isMobileDevice() {
    return window.innerWidth <= 767
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

.token-label {
  font-weight: 600;
}

@media (max-width: 575px) {
  .token-summary {
    font-size: 14px;
  }
}
</style>
