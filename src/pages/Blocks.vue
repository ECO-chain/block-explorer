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
              <li
                class="page-item"
                :class="isBusy ? 'disabled': ''"
                @click="changeBlocksDate(blocks.pagination.prev)"
              >
                <a class="page-link d-flex align-items-center">
                  <b-icon-arrow-left-short class="h3 mb-0"></b-icon-arrow-left-short>
                  {{ blocks.pagination.prev | timeFormat('ll') }}
                </a>
              </li>
              <li
                class="page-item"
                v-if="!blocks.pagination.isToday"
                :class="isBusy ? 'disabled': ''"
                @click="changeBlocksDate(nextDay)"
              >
                <a class="page-link d-flex align-items-center">
                  {{ nextDay | timeFormat('ll') }}
                  <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                </a>
              </li>
            </ul>
            <div class="text-center text-md-right">
              <p class="mb-0">{{ blocks.pagination.current | timeFormat('dddd MMMM Do YYYY') }}</p>
              <span class="small text-white-50">{{ checkDate(blocks.pagination) }}</span>
            </div>
          </nav>

          <div class="block-global p-3 mb-3 rounded-lg" v-if="!isMobileDevice">
            <div class="table-responsive" v-if="!isMobileDevice">
              <b-table
                id="blocks-table"
                class="blocks-list-table"
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
            <back-to-top-btn :visibleoffset="850"></back-to-top-btn>
          </div>

          <!-- mobile view -->
          <div v-if="isMobileDevice">
            <blocks-list-card
              v-for="(block, index) in limitedBlocks"
              :key="index"
              :block.sync="block"
            ></blocks-list-card>
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
            <back-to-top-btn></back-to-top-btn>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import blocksModule from '../api/blocks/index'
import { numberWithCommas } from '../api/filters'
import BlocksListCard from '../components/BlocksListCard.vue'
import BackToTopBtn from '../components/BackToTopBtn.vue'
import InfiniteLoading from 'vue-infinite-loading'
// eslint-disable-next-line no-unused-vars
import { Blocks, Pagination } from '../api/blocks/type'
import moment from 'moment'

@Component({
  components: {
    BlocksListCard,
    InfiniteLoading,
    BackToTopBtn
  }
})
export default class BlocksList extends Vue {
  blocks: Blocks = {} as Blocks
  // limitedBlocks: Blocks = {} as Blocks

  perPage = 200
  currentPage = 1
  isBusy = true
  nextDay = ''
  limit = 50

  async mounted() {
    this.blocks = await blocksModule.getBlocksList()
    this.nextDay = this.blocks.pagination.next
    this.isBusy = false
    console.log('blocks', this.blocks)
  }

  get fields() {
    return [
      {
        key: 'height',
        label: this.$t('views.blocks.height'),
        sortable: true,
        thClass: 'th-custom'
      },
      {
        key: 'time',
        label: this.$t('views.blocks.timestamp'),
        formatter: (val: number) => {
          return moment
            .unix(val)
            .utc()
            .format('LLL')
        },
        thClass: 'th-custom',
        class: 'text-center'
      },
      {
        key: 'txlength',
        label: this.$t('views.blocks.tx'),
        sortable: true,
        thClass: 'th-custom',
        class: 'text-center'
      },
      {
        key: 'minedBy',
        label: this.$t('views.blocks.mined_by'),
        thClass: 'th-custom',
        class: 'text-center'
      },
      {
        key: 'size',
        label: this.$t('views.blocks.size_in_byte'),
        sortable: true,
        thClass: 'th-custom text-center',
        tdClass: 'text-right',
        formatter: (val: number) => {
          return numberWithCommas(val)
        }
      }
    ]
  }

  get nowTime() {
    return moment()
      .format()
      .split('T')[0]
  }

  get isMobileDevice() {
    return window.innerWidth <= 767
  }

  get limitedBlocks() {
    return this.blocks.blocks.slice(0, this.limit)
  }

  checkDate(time: Pagination) {
    if (time.isToday) {
      return this.$t('views.blocks.today')
    }
    return moment(time.current).from(this.nowTime)
  }

  async changeBlocksDate(date: string) {
    this.isBusy = true
    this.blocks = await blocksModule.getBlocksByDateTime({ date })
    this.nextDay = this.blocks.pagination.next
    this.isBusy = false
    this.currentPage = 1
  }

  async loadMoreBlocks(date: string, more: boolean) {
    console.log('more?', more)
    if (more) {
      let blocksD = await blocksModule.getBlocksByDateTime({
        date: date,
        time: this.blocks.pagination.moreTs
      })

      for (let block of blocksD.blocks) {
        this.blocks.blocks.push(block)
      }

      this.blocks.pagination = blocksD.pagination
      this.blocks.length = this.blocks.blocks.length

      this.loadMoreBlocks(this.blocks.pagination.current, this.blocks.pagination.more)
    } else {
      console.log('now blocks finally', this.blocks)
      this.blocks.pagination.next = this.nextDay
    }
  }

  @Watch('blocks')
  async onBlocksChanged(val: any) {
    console.log('blocks has changed', val)
    this.loadMoreBlocks(val.pagination.current, val.pagination.more)
  }

  async infiniteHandler($state: any) {
    if (this.limit < this.blocks.length) {
      setTimeout(() => {
        this.limit += 50
        $state.loaded()
      }, 1000)
    } else {
      $state.complete()
    }
  }

  @Watch('this.$i18n')
  onLocaleChanged(val: any) {
    console.log('blocks!! locale has changed', val)
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

.blocks-list-table {
  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 991px) {
    font-size: 11.5px;
  }
}

.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
