<template>
  <div>
    <b-card>
      <b-list-group flush>
        <b-list-group-item v-if="tokenResult.length < 1">No result</b-list-group-item>
        <b-list-group-item
          v-else
          v-for="(token, index) in tokenResult"
          :key="index"
          class="result-list"
          @click="$router.push(`token/${token.contract_address}`)"
        >
          <b-row class="result-item">
            <b-col>
              <b-card-text class="result-symbol">{{ token.symbol }} - {{ token.name }}</b-card-text>
            </b-col>
            <b-col>
              <b-card-text
                class="result-supply"
              >{{ Number(token.total_supply) | numberWithCommas(8) }} ECOC</b-card-text>
            </b-col>
          </b-row>
          <b-card-text class="result-address">Address - {{ token.contract_address }}</b-card-text>
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
    console.log('prop sent', this.tokenResult)
  }
}
</script>

<style lang="scss" scoped>
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
    color: black;
    font-weight: 600;
  }

  .result-supply {
    text-align: right;
    color: purple;
  }
}

.result-address {
  font-size: smaller;
  font-weight: bold;
}
</style>
