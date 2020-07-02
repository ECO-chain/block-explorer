<template>
  <b-card class="token-card">
    <b-row @click="goToToken(token.contract_address)">
      <b-col cols="3" class="token-symbol">
        <div class="token-symbol-name">{{ token.symbol }}</div>
      </b-col>

      <b-col cols="9">
        <span class="token-name">{{ token.name }}</span>
        <b-row>
          <b-col>
            <p class="token-label">Total Supply</p>
            <span>{{ Number(token.total_supply) | numberWithCommas(8) }}</span>
          </b-col>
          <b-col>
            <p class="token-label">Holders</p>
            <span>{{ token.count_holders }}</span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <template v-slot:footer>
      <b-row>
        <b-col class="token-contract">Contract Address</b-col>
        <b-col class="text-truncate token-address text-right">
          <router-link
            :to="{ name: 'address', params: { addr: token.contract_address } }"
          >{{ token.contract_address }}</router-link>
        </b-col>
      </b-row>
    </template>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Token } from '../api/ecrc20/type'

@Component({})
export default class TokenListCard extends Vue {
  @Prop() token!: Token

  goToToken(addr: string) {
    this.$router.push({ name: 'token', params: { addr } })
  }
}
</script>

<style lang="scss" scoped>
.card {
  background: #1d1e2f !important;
  font-weight: 600;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 3px 8px 0px;

  .card-footer {
    background: #191a24;
  }

  span {
    color: white;
  }

  .token-symbol {
    display: flex;
    color: white;
    text-align: center;

    border-right: 1px solid #404040;

    .token-symbol-name {
      font-size: 18px !important;
      margin: auto;
    }
  }

  .token-label {
    color: #ffffff47;
    margin-top: 1rem;
    margin-bottom: 0;
  }

  .token-contract {
    color: #656570;
  }

  .token-address {
    color: $purple;
  }
}

@media (max-width: 425px) {
  .card {
    font-size: 12px;

    .token-symbol {
      .token-symbol-name {
        font-size: 14px !important;
      }
    }
  }
}
</style>
