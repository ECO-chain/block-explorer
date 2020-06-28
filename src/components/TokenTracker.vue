<template>
  <b-row>
    <b-col cols="12">
      <b-card
        class="block-global mb-3 rounded-lg token-tracker hvr-sweep-to-right"
        @click="toECRCToken(tokenBalance.contract.contract_address)"
      >
        <b-row>
          <b-col cols="2">
            <div class="token-sym text-center font-weight-bold">
              {{ tokenBalance.contract.symbol }}
            </div>
          </b-col>
          <b-col cols="8" class="token-text">
            <b-row class="font-weight-bold">{{ tokenBalance.contract.name }}</b-row>
            <b-row class="token-amount">
              {{ tokenBalance.amount | numberWithCommas(8) }}
              <span class="ml-2">{{ tokenBalance.contract.symbol }}</span>
            </b-row>
          </b-col>
          <b-col cols="2" class="text-md-right token-text">RANK #{{ tokenBalance.rank }}</b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ecrc20Module from '@/api/ecrc20/index'
// eslint-disable-next-line no-unused-vars
import { TokenTracker as Tracker } from '../api/ecrc20/type'

@Component({})
export default class TokenTracker extends Vue {
  @Prop() token!: Tracker

  tokenBalance: Tracker = {} as Tracker

  async mounted() {
    this.token.rank = await this.getBalanceRanking(
      this.token.address,
      this.token.contract.contract_address
    )

    this.tokenBalance = this.token
    console.log('rank getting', this.tokenBalance)
  }

  toECRCToken(address: string) {
    this.$router.push({ name: 'token', params: { addr: address } })
  }

  async getBalanceRanking(userAddr: string, contractAddr: string) {
    let balanceRanking = await ecrc20Module.getTokenHolders({ contractAddr, limit: 0, offset: 0 })

    let rankNumber = balanceRanking.items.findIndex(el => el.address === userAddr)

    // from index
    return rankNumber + 1
  }
}
</script>

<style lang="scss" scoped>
.token-tracker {
  text-transform: uppercase;
  .token-sym {
    background-image: linear-gradient(to right bottom, #69006e, #4d1a5f, #36204c, #262035, #1c1c1c);
    padding: 0.75rem;
    border-radius: 7px;
  }

  .token-amount {
    color: #6d6d6d;
  }
}

.hvr-sweep-to-right {
  cursor: pointer;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.hvr-sweep-to-right:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #2620357e;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-sweep-to-right:hover,
.hvr-sweep-to-right:focus,
.hvr-sweep-to-right:active {
  color: white;
}
.hvr-sweep-to-right:hover:before,
.hvr-sweep-to-right:focus:before,
.hvr-sweep-to-right:active:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
</style>
