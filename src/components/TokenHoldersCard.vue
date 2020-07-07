<template>
  <div>
    <b-card class="holder-list mb-3" v-for="(holder, index) in holders.items" :key="index">
      <b-card-text class="holder-label mt-0">Rank #{{ index+1 }}</b-card-text>
      <div class="text-truncate">
        <router-link
          :to="{ name: 'address', params: { addr: holder.address } }"
          class="holder-address"
        >{{ holder.address }}</router-link>
      </div>
      <b-row>
        <b-col>
          <b-card-text class="holder-label">Quantity</b-card-text>
          <span>{{ holder.amount | numberWithCommas({decimal: 8, fixed: 2}) }}</span>
        </b-col>
        <b-col>
          <b-card-text class="holder-label">Percentage</b-card-text>
          <span>{{ calculatePercentage(summary.total_supply, holder.amount) }}%</span>
        </b-col>
      </b-row>
    </b-card>
    <template v-if="holders.items.length > 0">
      <infinite-loading
        slot="append"
        @infinite="infiniteHolders"
        force-use-infinite-wrapper="block-global"
      ></infinite-loading>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ecrc20Module from '@/api/ecrc20/index'
import InfiniteLoading from 'vue-infinite-loading'
import { numberWithCommas } from '@/api/filters'
// eslint-disable-next-line no-unused-vars
import { TokenHolder, TokenHolders, TokenSummary } from '../api/ecrc20/type'

@Component({
  components: {
    InfiniteLoading,
  }
})
export default class TokenHoldersCard extends Vue {
  @Prop() holders!: TokenHolders
  @Prop() summary!: TokenSummary
  @Prop() addr!: string

  calculatePercentage(total: string, val: string) {
    const currentVal = Number(val) / Math.pow(10, 8)
    const totalVal = Number(total) / Math.pow(10, 8)
    return numberWithCommas((currentVal / totalVal) * 100, {fixed: 3})
  }

  async infiniteHolders($state: any) {
    if (this.holders.offset < this.holders.count) {
      setTimeout(async () => {
        console.log('infinite holders')
        let newHolders = await ecrc20Module.getTokenHolders({
          contractAddr: this.addr,
          limit: 20,
          offset: this.holders.offset + 20
        })
        newHolders.items.forEach(holder => {
          this.holders.items.push(holder)
        })
        this.holders.offset = newHolders.offset
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

.holder-list {
  .holder-address {
    font-weight: 600;
  }
  .holder-label {
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 14px;
    color: #ffffff3b !important;
  }
}
</style>
