<template>
  <div>
    <div class="block-search p-2 rounded-lg d-flex">
      <b-form-select class="rounded-0 w-auto" v-model="selected" :options="options"></b-form-select>
      <b-form-input
        class="rounded-0"
        v-model="keyword"
        @keypress.enter="searchFor(keyword)"
        placeholder="Search for block, transaction or address"
      ></b-form-input>
      <b-button
        @click="searchFor(keyword)"
        variant="primary"
        class="rounded-0 custom-search pl-3 pr-3"
      >
        <b-spinner small v-if="loading" class="search-spinner"></b-spinner>
        <b-icon-search v-else></b-icon-search>
      </b-button>
    </div>
    <SearchResult
      v-if="result !== null && loading === false && keyword.length > 0"
      :type.sync="type"
      :result.sync="result"
    ></SearchResult>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import { Vue, Component, Watch } from 'vue-property-decorator'
import SearchResult from '@/components/SearchResult.vue'
import ecrc20Module from '@/api/ecrc20/index'
import blocksModule from '@/api/blocks/index'
import addressModule from '@/api/address/index'
import txModule from '@/api/transaction/index'
import { BlockHash } from '../api/blocks/type'

@Component({
  components: {
    SearchResult
  }
})
export default class BlockSearchBox extends Vue {
  selected = 'all'
  keyword = null
  options = [
    { value: 'all', text: 'All Filters' },
    { value: 'address', text: 'Addresses' },
    { value: 'token', text: 'Tokens' },
    { value: 'block', text: 'Block' },
    { value: 'tx', text: 'Transaction' }
  ]

  loading = false
  result: any = null
  type = ''

  mounted() {}

  async searchFor(input: string) {
    switch (this.selected) {
      case 'all':
        this.result = await this.searchForAll(input)
        this.result = this.checkAndReturnError(this.result)
        this.loading = false
        break
      case 'address':
        this.result = await this.searchForAddress(input)
        this.result = this.checkAndReturnError(this.result)
        break
      case 'token':
        this.result = await this.searchForToken(input)
        this.result = this.checkAndReturnError(this.result)
        break
      case 'block':
        this.result = await this.searchForBlock(input)
        this.result = this.checkAndReturnError(this.result)
        break
      case 'tx':
        this.result = await this.searchForTransaction(input)
        this.result = this.checkAndReturnError(this.result)
        break
    }
  }

  async searchForAddress(addr: string) {
    this.loading = true
    let address = await addressModule.getAddressSummary(addr)
    this.loading = false
    this.type = 'address'
    return address
  }

  async searchForToken(contractAddr: string) {
    this.loading = true
    let token = await ecrc20Module.getTokenSummary(contractAddr)
    this.loading = false
    this.type = 'token'
    return token
  }

  async searchForBlock(input: string) {
    let blockHash: BlockHash | string = input
    this.loading = true
    if (/^\d+$/.test(input)) {
      // block height given
      blockHash = await blocksModule.getBlockHashByIndex(Number(input))
    }
    blockHash = typeof blockHash === 'string' ? blockHash : blockHash.blockHash
    let block = await blocksModule.getBlockDetail(blockHash)

    this.loading = false
    this.type = 'block'
    return block
  }

  async searchForTransaction(hash: string) {
    this.loading = true
    let tx = await txModule.getTransactionByHash(hash)
    this.loading = false
    this.type = 'transaction'
    return tx
  }

  async searchForAll(input: string) {
    let result: any
    let queueCall = [
      this.searchForAddress,
      this.searchForToken,
      this.searchForBlock,
      this.searchForTransaction
    ]
    this.loading = true
    for (let fn of queueCall) {
      result = await fn(input)
      if (result instanceof Error === false) {
        return result
      }
    }
    return result
  }

  checkAndReturnError(result: any) {
    if (result instanceof Error) {
      this.type = 'error'
      return new Error('No matching result')
    }
    return result
  }

  @Watch('keyword')
  keywordChanged(val: any) {
    if (val.length === 0) {
      this.result = null
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-search {
  border-radius: 0 6px 6px 0 !important;
  border: 0;
}

.search-spinner {
  margin-bottom: 0.1rem;
}
</style>
