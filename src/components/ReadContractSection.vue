<template>
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
        <b-icon-arrow-right-short class="h3 mb-0">{{ summary.decimals }}</b-icon-arrow-right-short>
      </b-col>
      <b-col cols="auto">8</b-col>
      <b-col cols="auto" class="text-purple-light">uint8</b-col>
    </b-row>
    <hr class="my-3" />
    <b-row class="align-items-center">
      <b-col cols="auto">4. {{ $t('views.token.version') }}</b-col>
      <b-col cols="auto">
        <b-icon-arrow-right-short class="h3 mb-0">{{ summary.version }}</b-icon-arrow-right-short>
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
              <b-col
                cols="auto"
                class="d-block text-truncate"
              >[ Owner address: 0abd9012fc9495d94346cbaded83f9e33be2ae07 ]</b-col>
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
              <b-col
                cols="auto"
                class="d-block text-truncate"
              >[ Owner address: 0abd9012fc9495d94346cbaded83f9e33be2ae07 ]</b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { TokenSummary } from '../api/ecrc20/type'

@Component
export default class ReadContractSection extends Vue {
  @Prop() summary!: TokenSummary
}
</script>

<style lang="scss" scoped>
</style>
