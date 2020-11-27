<template>
  <div>
    <b-card>
      <b-list-group flush>
        <b-list-group-item
          v-if="tokenResult.length < 1"
          class="no-result text-center font-weight-bold"
        >
          <i class="far fa-dizzy pr-1"></i>
          {{ $t('components.token_search_result.no_result') }}
        </b-list-group-item>
        <b-list-group-item
          v-else
          v-for="(token, index) in tokenResult"
          :key="index"
          class="result-list"
          @click="$router.push(`token/${token.contract_address}`)"
        >
          <b-row class="result-item">
            <b-col class="result-symbol">
              <b-card-text>{{ token.symbol }} - {{ token.name }}</b-card-text>
            </b-col>
            <b-col class="result-supply">
              <b-card-text>{{ Number(token.total_supply) | numberWithCommas({decimal: Number(token.decimals)}) }} {{ token.symbol }}</b-card-text>
            </b-col>
          </b-row>
          <b-card-text
            class="result-address"
          >{{ $t('components.token_search_result.addr') }} - {{ token.contract_address }}</b-card-text>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

// eslint-disable-next-line no-unused-vars
import { TokenItems, Token } from '../api/ecrc20/type'

@Component
export default class TokenSearchResult extends Vue {
  @PropSync('result', { type: Array }) tokenResult!: Token[]

  mounted() {
    // console.log('prop sent', this.tokenResult)
  }
}
</script>

<style lang="scss" scoped>
.card-body {
  padding: 10px 20px 10px 20px;
}

.result-list {
  padding-left: 10px;
  padding-right: 10px;

  cursor: pointer;
}

.result-list:hover {
  border-radius: 6px;
  background: linear-gradient(90deg, rgba(126, 61, 154, 1) 0%, rgba(33, 28, 48, 1) 100%);

  .result-symbol {
    color: white;
  }

  .result-supply {
    color: white;
  }

  .result-address {
    color: white;
  }
}

.result-item {
  margin-bottom: 5px;

  .result-symbol {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
    color: black;
    font-weight: 600;
  }

  .result-supply {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
    text-align: right;
    color: purple;
  }
}

.result-address {
  font-size: smaller;
  font-weight: bold;
}

@media (max-width: 767px) {
  .result-symbol {
    font-size: 14px;
  }

  .result-supply {
    font-size: 14px;
  }

  .no-result {
    font-size: 14px;
  }
}

@media (max-width: 520px) {
  .result-symbol {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 100%;
    flex: 0 0 100% !important;
    max-width: 100% !important;
    font-size: 14px;
  }

  .result-supply {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 100%;
    flex: 0 0 100% !important;
    max-width: 100% !important;
    font-size: 14px;
    text-align: left !important;
  }

  .result-address {
    font-size: 11px;
  }
}
</style>
