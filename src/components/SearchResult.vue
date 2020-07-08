<template>
  <div class="main-result">
    <b-card v-if="sType === 'transaction'" @click="goToTx(sResult.txid)">
      <b-card-text class="result-label">{{ $t('components.search_result.tx' )}}</b-card-text>
      <div class="p-3 hvr-sweep-to-right">
        <b-row class="transaction-result">
          <b-col>
            <p class="tx-id text-truncate mb-1">{{ sResult.txid }}</p>
          </b-col>
          <b-col>
            <p class="tx-time text-right mb-1">{{ sResult.time | timeFormat('LLLL') }}</p>
          </b-col>
        </b-row>
        <b-row class="transaction-result">
          <b-col class="tx-detail">
            <b-icon-info-circle-fill></b-icon-info-circle-fill>
            <span class="pl-2">{{ sResult.confirmations }}</span>
            {{ $t('components.search_result.confirm' )}}
          </b-col>
          <b-col class="text-center tx-detail">
            <span>{{ sResult.size }}</span>
            {{ $t('components.search_result.bytes' )}}
          </b-col>
          <b-col class="text-right tx-detail">
            {{ $t('components.search_result.value' )}}:
            <span>{{ sResult.valueOut }} ECOC</span>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <b-card v-if="sType === 'address'" @click="goToAddress(sResult.addrStr)">
      <b-card-text class="result-label">{{ $t('components.search_result.addr' )}}</b-card-text>
      <div class="p-3 hvr-sweep-to-right">
        <b-row class="address-result">
          <b-col>
            <p class="addr-hash text-truncate mb-1">{{ sResult.addrStr }}</p>
          </b-col>
          <b-col>
            <p class="addr-balance text-right mb-1">{{ sResult.balance | numberWithCommas }} ECOC</p>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <b-card v-if="sType === 'block'" @click="goToBlock(sResult.hash)">
      <b-card-text class="result-label">{{ $t('components.search_result.block' )}}</b-card-text>
      <div class="p-3 hvr-sweep-to-right">
        <b-row class="block-result">
          <b-col>
            <p class="text-truncate mb-1">
              <b-badge class="mr-2 block-badge">#{{ sResult.height }}</b-badge>
              <span class="block-hash">{{ sResult.hash }}</span>
            </p>
          </b-col>
          <b-col>
            <p class="text-right mb-1 block-time">{{ sResult.time | timeFormat('lll') }}</p>
          </b-col>
        </b-row>
        <b-row class="block-detail">
          <b-col>
            <b-icon-info-circle-fill></b-icon-info-circle-fill>
            <span class="pl-2">{{ sResult.tx.length }}</span>
            {{ sResult.tx.length > 1 ? 'Transactions' : 'Transaction' }}
          </b-col>
          <b-col class="text-right text-truncate">
            {{ $t('components.search_result.mined_by' )}}
            <span>{{ sResult.minedBy }}</span>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <b-card v-if="sType === 'token'" @click="goToToken(sResult.contract_address)">
      <b-card-text class="result-label">{{ $t('components.search_result.token' )}}</b-card-text>
      <div class="p-3 hvr-sweep-to-right">
        <b-row class="token-result">
          <b-col>
            <b-card-text class="token-symbol">{{ sResult.symbol }} - {{ sResult.name }}</b-card-text>
          </b-col>
          <b-col>
            <b-card-text
              class="token-supply"
            >{{ Number(sResult.total_supply) | numberWithCommas({decimal: 8}) }} ECOC</b-card-text>
          </b-col>
        </b-row>
        <b-card-text
          class="token-address"
        >{{ $t('components.search_result.addr' )}} - {{ sResult.contract_address }}</b-card-text>
      </div>
    </b-card>

    <b-card v-if="sType === 'error'">
      <b-card-text class="text-center font-weight-bold">
        <i class="far fa-dizzy pr-2"></i>
        {{ $t('components.search_result.no_result' )}}
      </b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { Vue, Component, PropSync, Watch } from 'vue-property-decorator'

@Component
export default class SearchResult extends Vue {
  @PropSync('type', { type: String }) sType!: string
  @PropSync('result', { type: Object }) sResult!: object

  mounted() {
    // console.log('now result', this.sResult)
  }

  // @Watch('sResult')
  // resultChanged(val: any) {
  //   console.log('now result changed', val)
  // }

  goToTx(id: string) {
    this.$router.push({ name: 'transaction', params: { hash: id } })
  }

  goToAddress(hash: string) {
    this.$router.push({ name: 'address', params: { addr: hash } })
  }

  goToBlock(hash: string) {
    this.$router.push({ name: 'block', params: { hash } })
  }

  goToToken(addr: string) {
    this.$router.push({ name: 'token', params: { addr } })
  }
}
</script>

<style lang="scss" scoped>
.main-result {
  margin-top: -4px;
}

.result-label {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
}

.transaction-result {
  border-radius: 8px;
  .tx-id {
    font-weight: bold;
    color: $old-purple;
  }

  .tx-detail {
    font-weight: bold;
    font-size: 14px;
    span {
      color: darkgray;
    }
  }
}

.address-result {
  border-radius: 8px;

  .addr-hash {
    font-weight: bold;
    color: $old-purple;
  }

  .addr-balance {
    font-weight: bold;
  }
}

.block-result {
  border-radius: 8px;

  .block-badge {
    background-color: rgba(126, 61, 154, 1);
  }
  .block-hash {
    color: #595e63;
    font-weight: bold;
  }

  .block-time {
    font-size: smaller;
    font-weight: bold;
  }
}

.block-detail {
  font-weight: bold;
  font-size: 14px;

  span {
    color: darkgray;
  }
}

.token-result {
  margin-bottom: 5px;

  .token-symbol {
    color: black;
    font-weight: 600;
  }

  .token-supply {
    text-align: right;
    color: purple;
  }
}

.token-address {
  font-size: smaller;
  font-weight: bold;
}

// hover effect
.hvr-sweep-to-right {
  border-radius: 8px;
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
  border-radius: 8px;
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(126, 61, 154, 1) 0%, rgba(33, 28, 48, 1) 100%);
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
  border-radius: 8px;
  color: white !important;
  .transaction-result {
    .tx-id {
      color: white;
    }
    .tx-detail {
      span {
        color: white;
      }
    }
  }

  .address-result {
    .addr-hash {
      color: white;
    }
  }

  .block-result {
    .block-badge {
      background-color: whitesmoke;
      color: rgba(126, 61, 154, 1);
    }

    .block-hash {
      color: whitesmoke;
    }
  }

  .block-detail {
    span {
      color: whitesmoke;
    }
  }

  .token-result {
    .token-symbol {
      color: whitesmoke;
    }

    .token-supply {
      color: whitesmoke;
    }
  }

  .token-address {
    color: whitesmoke;
  }
}
.hvr-sweep-to-right:hover:before,
.hvr-sweep-to-right:focus:before,
.hvr-sweep-to-right:active:before {
  border-radius: 8px;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  color: white !important;
  .transaction-result {
    .tx-id {
      color: white;
    }
    .tx-detail {
      span {
        color: white;
      }
    }
  }

  .address-result {
    .addr-hash {
      color: white;
    }
  }

  .block-result {
    .block-badge {
      background-color: whitesmoke;
      color: rgba(126, 61, 154, 1);
    }

    .block-hash {
      color: whitesmoke;
    }
  }

  .block-detail {
    span {
      color: whitesmoke;
    }
  }

  .token-result {
    .token-symbol {
      color: whitesmoke;
    }

    .token-supply {
      color: whitesmoke;
    }
  }

  .token-address {
    color: whitesmoke;
  }
}
</style>
