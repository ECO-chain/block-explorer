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
              <li class="page-item" :class="isBusy ? 'disabled': ''">
                <router-link
                  class="page-link d-flex align-items-center"
                  :to="{ name: 'blocks', params: { date: blocks.pagination.prev } }"
                >
                  <b-icon-arrow-left-short class="h3 mb-0"></b-icon-arrow-left-short>
                  {{ blocks.pagination.prev | timeFormat('ll') }}
                </router-link>
              </li>
              <li
                class="page-item"
                v-if="!blocks.pagination.isToday"
                :class="isBusy ? 'disabled': ''"
              >
                <router-link
                  class="page-link d-flex align-items-center"
                  :to="{ name: 'blocks', params: { date: blocks.pagination.next } }"
                >
                  {{ blocks.pagination.next | timeFormat('ll') }}
                  <b-icon-arrow-right-short class="h3 mb-0"></b-icon-arrow-right-short>
                </router-link>
              </li>
            </ul>

            <div class="text-center text-md-right">
              <p class="mb-0">{{ blocks.pagination.current | timeFormat('dddd MMMM Do YYYY') }}</p>
              <span class="small text-white-50">{{ checkDate(blocks.pagination) }}</span>
            </div>
          </nav>

          <div v-if="!isMobileDevice">
            <b-collapse v-model="isFetchMore">
              <div class="loading-bar">
                <b-spinner small class="mr-2"></b-spinner>Loading more blocks...
              </div>
            </b-collapse>
          </div>

          <div class="block-global p-3 mb-3 rounded-lg" v-if="!isMobileDevice">
            <div class="table-responsive">
              <b-table
                id="blocks-table"
                class="blocks-list-table"
                dark
                show-empty
                :fields="fields"
                :items="blocks.blocks"
                :per-page="perPage"
                :current-page="currentPage"
                :busy="isBusy"
              >
                <template v-slot:empty>
                  <div class="table-no-record">
                    <i class="far fa-tired"></i>
                    <p> {{ $t('dom.table.no_records') }}</p>
                  </div>
                </template>
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
                  <div class="busy">
                    <pixel-spinner
                      class="m-auto"
                      :animation-duration="2000"
                      :size="70"
                      color="#ffffff"
                    />
                    <strong>Blocks is currently fetching</strong>
                  </div>
                </template>
              </b-table>
            </div>

            <div v-if="isMobileDevice">
              <b-collapse v-model="isFetchMore">
                <div class="loading-bar-table">
                  <b-spinner small class="mr-2"></b-spinner>Loading more blocks...
                </div>
              </b-collapse>
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
            <div class="busy" v-if="isBusy">
              <pixel-spinner class="m-auto" :animation-duration="2000" :size="70" color="#ffffff" />
              <strong>Blocks is currently fetching</strong>
            </div>
            <blocks-list-card v-else :blocks.sync="blocks"></blocks-list-card>
            <back-to-top-btn></back-to-top-btn>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import blocksModule from '../api/blocks/index'
import { numberWithCommas } from '../api/filters'
import { PixelSpinner } from 'epic-spinners'
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
    BackToTopBtn,
    PixelSpinner
  }
})
export default class BlocksList extends Vue {
  @Prop() date!: string
  blocks: Blocks = {} as Blocks

  perPage = 200
  currentPage = 1
  isBusy = true
  isFetchMore = false
  nextDay = ''

  async mounted() {
    if (this.date) {
      this.blocks = await blocksModule.getBlocksByDateTime({ date: this.date })
      this.nextDay = this.blocks.pagination.next
      this.loadMoreBlocks(this.blocks.pagination)
    } else {
      this.blocks = await blocksModule.getBlocksList()
      this.nextDay = this.blocks.pagination.next
      this.loadMoreBlocks(this.blocks.pagination)
    }
    this.isBusy = false
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

  get selectedDate() {
    return this.date ? this.date : this.nowTime
  }

  checkDate(time: Pagination) {
    if (time.isToday) {
      return this.$t('views.blocks.today')
    }
    return moment(time.current).from(this.nowTime)
  }

  async loadMoreBlocks(blocksTime: Pagination) {
    if (blocksTime.more) {
      try {
        this.isFetchMore = true
        let blocksD = await blocksModule.getBlocksByDateTime({
          date: blocksTime.current,
          time: blocksTime.moreTs
        })

        blocksD.blocks.forEach(block => {
          this.blocks.blocks.push(block)
        })

        this.blocks.pagination = blocksTime
        this.blocks.pagination.next = this.nextDay
        this.blocks.length = this.blocks.blocks.length

        this.loadMoreBlocks(blocksD.pagination)
      } catch (e) {
        this.isFetchMore = false
      }
    } else {
      this.blocks.pagination.next = this.nextDay
      this.isFetchMore = false
    }
  }

  @Watch('$route')
  async routeUpdated(to: any) {
    this.isBusy = true
    //cancel request
    await blocksModule.getBlocksByDateTime({
      date: '',
      cancel: true
    })
    window.stop()

    // fetch new blocks on new date
    this.blocks = await blocksModule.getBlocksByDateTime({ date: to.params.date })
    this.nextDay = this.blocks.pagination.next
    this.isBusy = false
    this.loadMoreBlocks(this.blocks.pagination)
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

.busy {
  text-align: center;
  padding: 4rem;
}

.disabled {
  pointer-events: none;
  cursor: default;
}

.loading-bar {
  display: flex;
  font-size: 14px;
  background: #621b82;
  border-radius: 6px;
  padding: 0.4rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  justify-content: center;
  align-items: center;
}

.loading-bar-table {
  @extend .loading-bar;
  border-radius: 0 !important;
  background: #242731 !important;
}
</style>
