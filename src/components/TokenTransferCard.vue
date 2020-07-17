<template>
  <div>
    <b-card class="mb-3" v-for="(transfer,index) in transfer.items" :key="index">
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
          {{ Number(transfer.value) | numberWithCommas({decimal: 8}) }}
        </b-col>
      </b-row>
    </b-card>
    <template v-if="'items' in transfer">
      <infinite-loading
        slot="append"
        @infinite="inifiniteTransfer"
        force-use-infinite-wrapper="block-global"
      ></infinite-loading>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ecrc20Module from '@/api/ecrc20/index'
import InfiniteLoading from 'vue-infinite-loading'
// eslint-disable-next-line no-unused-vars
import { TokenTransfers } from '../api/ecrc20/type'

@Component({
  components: {
    InfiniteLoading
  }
})
export default class TokenTransferCard extends Vue {
  @Prop() transfer!: TokenTransfers
  @Prop() addr!: string

  async inifiniteTransfer($state: any) {
    if (this.transfer.offset < this.transfer.count) {
      setTimeout(async () => {
        // console.log('infinite transfers')
        let newTransfers = await ecrc20Module.getTokenTransfers({
          contractAddr: this.addr,
          limit: 20,
          offset: this.transfer.offset + 20
        })
        newTransfers.items.forEach(transfer => {
          this.transfer.items.push(transfer)
        })
        this.transfer.offset = newTransfers.offset
        $state.loaded()
      }, 500)
    } else {
      $state.complete()
    }
  }
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
