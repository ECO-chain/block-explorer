<template>
  <div class="container-fill-height">
    <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
      <b-row>
        <b-col cols="12">
          <div class="group-head my-3 text-center text-md-left">
            <h2 class="head-page mb-1">{{ $t('views.blocks.blocks_by_d') }}</h2>
          </div>

          <nav
            class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-end my-3"
          >
            <ul
              class="pagination pagination-dark mb-3 mb-md-0 justify-content-center justify-content-md-end"
            >
              <li class="page-item">
                <a
                  class="page-link d-flex align-items-center"
                  @click="changeBlocksDate(blocks.pagination.prev)"
                >
                  <b-icon-arrow-left-short class="h3 mb-0"></b-icon-arrow-left-short>
                  {{ blocks.pagination.prev | timeFormat('ll') }}
                </a>
              </li>
              <li
                class="page-item"
                v-if="!blocks.pagination.isToday"
                @click="changeBlocksDate(blocks.pagination.next)"
              >
                <a class="page-link d-flex align-items-center">
                  {{ blocks.pagination.next | timeFormat('ll') }}
                  <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                </a>
              </li>
            </ul>
            <div class="text-center text-md-right">
              <p class="mb-0">{{ blocks.pagination.current | timeFormat('dddd MMMM Do YYYY') }}</p>
              <span class="small text-white-50">{{ checkDate(blocks.pagination) }}</span>
            </div>
          </nav>

          <div class="block-global p-3 mb-3 rounded-lg">
            <div class="table-responsive">
              <b-table
                id="blocks-table"
                dark
                :fields="fields"
                :items="blocks.blocks"
                :per-page="perPage"
                :current-page="currentPage"
                :busy="isBusy"
              >
                <template v-slot:cell(height)="data">
                  <router-link
                    :to="{ name: 'block', params: { hash: data.item.hash } }"
                  >{{ data.item.height }}</router-link>
                </template>
                <template v-slot:cell(minedBy)="data">
                  <router-link
                    :to="{ name: 'address', params: { addr: data.item.minedBy } }"
                  >{{ data.item.minedBy }}</router-link>
                </template>
                <template v-slot:table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
              </b-table>
            </div>
          </div>

          <div class="my-2 d-flex justify-content-center">
            <b-pagination
              v-if="!isBusy"
              class="pagination-dark"
              v-model="currentPage"
              :total-rows="blocks.length"
              :per-page="perPage"
              aria-controls="blocks-table"
            ></b-pagination>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import blocksModule from '../api/blocks/index'
// eslint-disable-next-line no-unused-vars
import { Blocks, Pagination } from '../api/blocks/type'
import moment from 'moment'

@Component
export default class BlocksList extends Vue {
  blocks: Blocks = {} as Blocks
  allBlocks: Blocks = {} as Blocks

  fields: any[] = []

  perPage = 200
  currentPage = 1
  isBusy = true

  created() {
    this.fields = [
      { key: 'height', label: this.$t('views.blocks.height'), sortable: true },
      {
        key: 'time',
        label: this.$t('views.blocks.timestamp'),
        formatter: (val: number) => {
          return moment
            .unix(val)
            .utc()
            .format('LLL')
        }
      },
      { key: 'txlength', label: this.$t('views.blocks.tx'), sortable: true },
      { key: 'minedBy', label: this.$t('views.blocks.mined_by') },
      { key: 'size', label: this.$t('views.blocks.size_in_byte'), sortable: true }
    ]
  }

  async mounted() {
    this.blocks = await blocksModule.getAllBlocksByDateTime(this.nowTime)
    this.isBusy = false
    console.log('blocks', this.blocks)
  }

  get nowTime() {
    return moment()
      .format()
      .split('T')[0]
  }

  checkDate(time: Pagination) {
    if (time.isToday) {
      return 'Today'
    }
    return moment(time.current).from(this.nowTime)
  }

  async changeBlocksDate(date: string) {
    this.isBusy = true
    this.blocks = await blocksModule.getAllBlocksByDateTime(date)
    this.isBusy = false
    this.currentPage = 1
  }
}
</script>

<style lang="scss" scoped>
.page-item {
  cursor: pointer;
}
.group-head {
  h2::first-letter {
    color: $purple;
    font-weight: bold;
  }
}
</style>
