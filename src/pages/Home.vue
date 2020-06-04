<template>
  <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
    <b-row>
      <b-col cols="12">
        <BlockSearchBox></BlockSearchBox>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col cols="12" lg="6" class="d-flex flex-column">
        <h2 class="head-global my-3">Blockchain Info</h2>
        <div class="block-global p-3 mb-3 rounded-lg w-100 h-100">
          <b-row>
            <b-col cols="12" md="6">
              <div class="bg-purple-gd rounded-lg text-center p-3 my-3">
                <p class="my-1 text-style-2">{{ statusState.finalSupply | numberWithCommas }} ECOC</p>
                <p class="my-1">Final Supply(Max)</p>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div class="bg-purple-gd rounded-lg text-center p-3 my-3">
                <p class="my-1 text-style-2">{{ Number(statusState.supply) | numberWithCommas }} ECOC</p>
                <p class="my-1">Current Supply</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">{{ info.relayfee }}</div>
                <div class="my-1 small text-purple-light">Relay Fee</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">{{ info.difficulty['proof-of-stake'] | numberWithCommas }}</div>
                <div class="my-1 small text-purple-light">Difficulty</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">{{ info.connections }}</div>
                <div class="my-1 small text-purple-light">Connections</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">{{ stakingInfo.netstakeweight | numberWithCommas(8) }}</div>
                <div class="my-1 small text-purple-light">Network Weight</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">{{ info.blocks | numberWithCommas }}</div>
                <div class="my-1 small text-purple-light">Block Height</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">{{ info.reward | numberWithCommas(8) }} ECOC</div>
                <div class="my-1 small text-purple-light">Block Reward</div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="12" lg="6" class="d-flex flex-column">
        <h2 class="head-global my-3">7 day ECOC transaction history</h2>
        <div class="block-global p-3 mb-3 rounded-lg w-100 h-100 d-flex align-items-center">
          <template v-if="Array.isArray(sevenDaysTx)">
            <LineChart id="1" :labels.sync="txDate" :data.sync="txCount"></LineChart>
          </template>
        </div>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col cols="12">
        <h2 class="head-global my-3">Blocks</h2>
        <div class="block-bitcoin">
          <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <router-link to="/block">399129</router-link>
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Mined by:
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EKfT5eCujEDuMok5kYo8VkG95jRmAnmaaL</router-link>
                </div>
                <div class="my-1 small">Size: 927</div>
                <div class="my-1 small">Transactions: 2</div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </b-col>
    </b-row>
    <b-row class="my-3 mb-4 mb-sm-5">
      <b-col cols="12">
        <h2 class="head-global my-3">Transactions</h2>
        <div class="block-bitcoin">
          <swiper :options="swiperOption">
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link
                    to="/tx"
                    class="d-block text-truncate"
                  >9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link
                    to="/tx"
                    class="d-block text-truncate"
                  >9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link
                    to="/tx"
                    class="d-block text-truncate"
                  >9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link
                    to="/tx"
                    class="d-block text-truncate"
                  >9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link
                    to="/tx"
                    class="d-block text-truncate"
                  >9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link
                    to="/tx"
                    class="d-block text-truncate"
                  >9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="block-item p-3 rounded-lg">
                <div
                  class="my-1 mb-3 border-bottom border-purple-light d-flex justify-content-between align-items-center"
                >
                  <span class="small text-purple-light">3 mins ago</span>
                </div>
                <div class="my-1 small">
                  Hash:
                  <router-link
                    to="/tx"
                    class="d-block text-truncate"
                  >9bb6236fd1c0d25b98bc8d95b5a7ab81f10e9fa9d57fdbfeb76390c92d1a8db9</router-link>
                </div>
                <div class="my-1 small">Value Out: 1,275.7 ECOC</div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BlockSearchBox from '@/components/SearchBox.vue'
import LineChart from '@/components/LineChart.vue'
import statusModule from '@/api/status/index'
import statisticsModule from '@/api/statistics/index'
import { toMonthDayFormat } from '@/api/filters'
/* eslint-disable no-unused-vars */
import { StatusState, Info, StakingInfo } from '../api/status/type'
import { TransactionStats } from '../api/statistics/type'

@Component({
  components: {
    BlockSearchBox,
    LineChart
  }
})
export default class Home extends Vue {
  swiperOption = {
    autoplay: {
      delay: Math.floor(Math.random() * (4000 - 3000) + 3000),
      stopOnLastSlide: false,
      disableOnInteraction: false
    },
    loop: false,
    watchSlidesVisibility: true,
    slidesPerView: 5,
    spaceBetween: 30,
    breakpoints: {
      575.98: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      767.98: {
        slidesPerView: 2
      },
      991.98: {
        slidesPerView: 3
      },
      1199.98: {
        slidesPerView: 4
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }

  sevenDaysTx: TransactionStats[] | null = null
  txDate: String[] = []
  txCount: Number[] = []

  async mounted() {
    const info = await statusModule.getInfo()
    const stakingInfo = await statusModule.getStakingInfo()
    const supply = await statusModule.getTotalSupply()

    this.sevenDaysTx = await statisticsModule.getTransactionStats('7')
    this.txDate = this.sevenDaysTx
      .map(tx => {
        return toMonthDayFormat(tx.date.toString())
      })
      .reverse()
    this.txCount = this.sevenDaysTx.map(tx => tx.transaction_count).reverse()

    statusModule.setInfo(info)
    statusModule.setStakingInfo(stakingInfo)
    statusModule.setSupply(supply)
  }

  get statusState(): StatusState {
    return statusModule.state
  }

  get info(): Info {
    return this.statusState.info
  }

  get stakingInfo(): StakingInfo {
    return this.statusState.stakingInfo
  }
}
</script>
