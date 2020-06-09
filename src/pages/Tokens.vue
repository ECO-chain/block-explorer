<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">
              <span>T</span>oken Contracts
            </h2>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="block-search p-3 mb-2 rounded-lg d-flex">
            <b-form-input
              v-model="input"
              @update="queryToken"
              class="rounded-0"
              placeholder="Enter an ERC20 Contract Address or Token Name"
            ></b-form-input>
            <b-button variant="primary" class="rounded-0">Search</b-button>
          </div>
          <template v-if="Array.isArray(tokensResult.items) && input.length > 0">
            <!-- <span>Hi</span> -->
            <token-search-result class="result-from-input" :result.sync="tokensResult.items"></token-search-result>
          </template>
        </b-col>

        <b-col cols="12">
          <div class="block-global p-3 my-3 rounded-lg">
            <div class="table-responsive m-0">
              <b-table dark :items="tokens.items" :fields="fields">
                <template v-slot:cell(name)="data">
                  <a :href="`token/${data.item.contract_address}`">{{ data.item.symbol }} - {{data.item.name}}</a>
                </template>
                <template v-slot:cell(contract_address)="data">
                  <a :href="`token/${data.item.contract_address}`">{{ data.item.contract_address }}</a>
                </template>
              </b-table>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ecrc20Module from '@/api/ecrc20/index'
import { numberWithCommas } from '@/api/filters'
import TokenSearchResult from '@/components/TokenSearchResult.vue'

// eslint-disable-next-line no-unused-vars
import { TokenItems } from '../api/ecrc20/type'

@Component({
  components: {
    TokenSearchResult
  }
})
export default class Tokens extends Vue {
  tokens: TokenItems = {} as TokenItems
  tokensResult: TokenItems = {} as TokenItems
  input = ''

  fields = [
    { key: 'name', label: 'Token Information', sortable: true },
    { key: 'contract_address' },
    {
      key: 'total_supply',
      sortable: true,
      formatter: (value: string) => {
        return numberWithCommas(Number(value), 8)
      }
    },
    { key: 'count_holders', sortable: true, label: 'Holders' }
  ]

  async mounted() {
    this.tokens = await ecrc20Module.getAllTokens()

    console.log('now tokens table', this.tokens)
  }

  async queryToken(val: string) {
    if (val !== "") {
      this.tokensResult = await ecrc20Module.getTokenBySearch(val)
      console.log("search result", this.tokensResult)
    }
  }
}
</script>

<style lang="scss" scoped>
  .result-from-input {
    margin: -1.4rem 5.3rem 0 1.1rem;
  }
</style>
