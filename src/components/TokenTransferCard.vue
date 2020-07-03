<template>
  <b-card class="mb-3">
    <b-row>
      <b-col>
        <b-card-text class="text-truncate transfer-hash font-weight-bolder">
          <router-link
            :to="{ name: 'transaction', params: { hash: transfer.tx_hash } }"
          >{{ transfer.tx_hash }}</router-link>
        </b-card-text>
      </b-col>
      <b-col class="text-right">{{ transfer.tx_time * 1000 | timeFromNow }}</b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col class="transfer-to">
        <div class="text-truncate">
          <router-link
            :to="{ name: 'address', params: { addr: transfer.from } }"
          >{{ transfer.from }}</router-link>
        </div>
        <i class="fas fa-arrow-right tx-arrow"></i>
        <div class="text-truncate">
          <router-link :to="{ name: 'address', params: { addr: transfer.to } }">{{ transfer.to }}</router-link>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <span class="transfer-label pr-2">Quantitiy</span>
        {{ Number(transfer.value) | numberWithCommas(8) }}
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { TokenTransfer } from '../api/ecrc20/type'

@Component
export default class TokenTransferCard extends Vue {
  @Prop() transfer!: TokenTransfer
}
</script>

<style lang="scss" scoped>
.card {
  background: #1d1e2f !important;
  font-size: 14px;
  box-shadow: 0 6px 12px #080808;
}

.transfer-to {
  display: flex;
}

.tx-arrow {
  margin: auto 0.6rem;
}

.transfer-hash {
  color: $purple;
}

.transfer-label {
  font-weight: 600;
  color: #969696;
}
</style>
