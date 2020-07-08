<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">{{ $t('views.tokens.token_contracts') }}</h2>
          </div>
          <!-- END .group-head -->
        </b-col>

        <b-col cols="12">
          <div class="block-search p-2 mb-2 rounded-lg d-flex">
            <b-form-input
              v-model="input"
              @update="queryToken"
              class="rounded-0"
              :placeholder="$t('views.tokens.search_placeholder')"
            ></b-form-input>
            <b-button variant="primary" class="rounded-0 search-btn pl-3 pr-3">
              <i class="fas fa-search"></i>
            </b-button>
          </div>
          <template v-if="Array.isArray(tokensResult.items) && input.length > 0">
            <token-search-result class="result-from-input" :result.sync="tokensResult.items"></token-search-result>
          </template>
        </b-col>

        <b-col cols="12">
          <div class="block-global p-3 my-3 rounded-lg" v-if="!isMobileDevice">
            <div class="table-responsive m-0">
              <b-table class="token-list-table" dark :items="tokens.items" :fields="fields">
                <template v-slot:cell(name)="data">
                  <router-link
                    :to="{ name: 'token', params: { addr: data.item.contract_address } }"
                  >
                    <b>{{ data.item.symbol }} - {{ data.item.name }}</b>
                  </router-link>
                </template>
                <template v-slot:cell(contract_address)="data">
                  <router-link
                    :to="{ name: 'address', params: { addr: data.item.contract_address } }"
                  >{{ data.item.contract_address }}</router-link>
                </template>
              </b-table>
            </div>
          </div>
          <div v-else>
            <token-list-card v-for="(token,index) in tokens.items" :key="index" :token="token"></token-list-card>
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
import TokenListCard from '@/components/TokenListCard.vue'
// eslint-disable-next-line no-unused-vars
import { TokenItems } from '../api/ecrc20/type'

@Component({
  components: {
    TokenSearchResult,
    TokenListCard
  }
})
export default class Tokens extends Vue {
  tokens: TokenItems = {} as TokenItems
  tokensResult: TokenItems = {} as TokenItems
  input = ''

  async mounted() {
    this.tokens = await ecrc20Module.getAllTokens()

    console.log('now tokens table', this.tokens)
  }

  get isMobileDevice() {
    return window.innerWidth <= 767
  }

  get fields() {
    return [
      {
        key: 'name',
        label: this.$t('views.tokens.token_info'),
        sortable: true,
        thClass: 'th-custom'
      },
      {
        key: 'contract_address',
        label: this.$t('views.tokens.contract_addr'),
        thClass: 'th-custom',
        class: 'text-center'
      },
      {
        key: 'total_supply',
        label: this.$t('views.tokens.total_supply'),
        sortable: true,
        formatter: (value: string) => {
          return numberWithCommas(Number(value), { decimal: 8 })
        },
        thClass: 'th-custom',
        class: 'text-right'
      },
      {
        key: 'count_holders',
        label: this.$t('views.tokens.holders'),
        sortable: true,
        thClass: 'th-custom',
        class: 'text-right'
      }
    ]
  }

  async queryToken(val: string) {
    if (val !== '') {
      this.tokensResult = await ecrc20Module.getTokenBySearch(val)
      console.log('search result', this.tokensResult)
    }
  }
}
</script>

<style lang="scss" scoped>
.result-from-input {
  margin-top: -1.2rem;
  margin-left: 0.45rem;
  margin-right: 0.45rem;
}

.group-head {
  h2::first-letter {
    color: $purple;
    font-weight: bold;
  }
}

.search-btn {
  border: 0;
  border-radius: 0 4px 4px 0 !important;
}

@media (max-width: 767px) {
  input {
    font-size: 14px !important;
  }
}

@media (max-width: 991px) {
  .token-list-table {
    font-size: 14px;
  }
}

@media (max-width: 425px) {
  input {
    font-size: 12px !important;
  }
}
</style>
