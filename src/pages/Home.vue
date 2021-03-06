<template>
  <b-container class="mb-3 mb-sm-4 pt-4 pt-sm-5">
    <b-row>
      <b-col cols="12">
        <BlockSearchBox></BlockSearchBox>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col cols="12" lg="6" class="d-flex flex-column">
        <h2 class="head-global my-3">{{ $t('views.home.block_info') }}</h2>
        <div class="block-global p-3 mb-3 rounded-lg w-100 h-100">
          <b-row>
            <b-col cols="12" md="6">
              <div class="show-supply-idle rounded-lg text-center p-3 my-3">
                <p class="my-1 text-style-2">
                  {{ getFinalSupply(info.blocks) | numberWithCommas }} ECOC</p>
                <p class="my-1 supply-label">{{ $t('views.home.final_supply') }}</p>
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div class="show-supply-idle rounded-lg text-center p-3 my-3">
                <p class="my-1 text-style-2">
                  <countTo
                    :startVal="startedSupply"
                    :endVal="Number(statusState.supply)"
                    :duration="6000"
                  ></countTo>ECOC
                </p>
                <p class="my-1 supply-label">{{ $t('views.home.current_supply') }}</p>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">{{ info.relayfee }}</div>
                <div class="my-1 small text-purple-light">{{ $t('views.home.relay_fee') }}</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <countTo
                  class="my-1 text-truncate"
                  :startVal="startedDifficulty"
                  :endVal="Number(info.difficulty['proof-of-stake'])"
                  :duration="3000"
                ></countTo>
                <div class="my-1 small text-purple-light">{{ $t('views.home.difficulty') }}</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div class="my-1 text-truncate">{{ info.connections }}</div>
                <div class="my-1 small text-purple-light">{{ $t('views.home.connections') }}</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <countTo
                  class="my-1 text-truncate"
                  :startVal="startedWeight"
                  :endVal="stakingInfo.netstakeweight / Math.pow(10, 8)"
                  :decimals="2"
                  :duration="3000"
                ></countTo>
                <div class="my-1 small text-purple-light">{{ $t('views.home.network_weight') }}</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <countTo
                  class="my-1 text-truncate"
                  :startVal="startedBlock"
                  :endVal="info.blocks"
                  :duration="3000"
                ></countTo>
                <div class="my-1 small text-purple-light">{{ $t('views.home.block_height') }}</div>
              </div>
            </b-col>
            <b-col cols="6" md="4">
              <div class="text-center my-3">
                <div
                  class="my-1 text-truncate"
                >{{ info.reward | numberWithCommas({decimal: 8}) }} ECOC</div>
                <div class="my-1 small text-purple-light">{{ $t('views.home.block_reward') }}</div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="12" lg="6" class="d-flex flex-column">
        <h2 class="head-global my-3">{{ $t('views.home.seven_days_tx') }}</h2>
        <div class="block-global p-3 mb-3 rounded-lg w-100 h-100 d-flex align-items-center">
          <template v-if="Array.isArray(sevenDaysTx)">
            <LineChart id="1" :labels.sync="txDate" :data.sync="txCount"></LineChart>
          </template>
        </div>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col cols="12">
        <h2 class="head-global my-3">{{ $t('views.home.blocks') }}</h2>
        <template v-if="checkSocketBlock">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(sBlock, index) in socketBlock" :key="index">
              <SocketBlocksCard :socket="sBlock"></SocketBlocksCard>
            </swiper-slide>
          </swiper>
        </template>
      </b-col>
    </b-row>
    <b-row class="my-3 mb-4 mb-sm-5">
      <b-col cols="12">
        <h2 class="head-global my-3">{{ $t('views.home.tx') }}</h2>
        <template v-if="socketTx.length > 0">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(tx, index) in socketTx" :key="index">
              <SocketTxCard :tx="tx"></SocketTxCard>
            </swiper-slide>
          </swiper>
        </template>
        <template v-else>
          <div class="p-5">
            <fulfilling-square-spinner
              class="m-auto"
              :animation-duration="4000"
              :size="40"
              color="#ffffff"
            />
          </div>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import BlockSearchBox from '@/components/SearchBox.vue'
import LineChart from '@/components/LineChart.vue'
import SocketBlocksCard from '@/components/SocketBlocksCard.vue'
import { FulfillingSquareSpinner } from 'epic-spinners'
import SocketTxCard from '@/components/SocketTxCard.vue'
import statusModule from '@/api/status/index'
import statisticsModule from '@/api/statistics/index'
import blocksModule from '@/api/blocks/index'
import txModule from '@/api/transaction/index'
import { toMonthDayFormat } from '@/api/filters'
import countTo from 'vue-count-to'
/* eslint-disable no-unused-vars */
import { StatusState, Info, StakingInfo } from '../api/status/type'
import { TransactionStats } from '../api/statistics/type'
import { Blocks, Block, BlockDetail, SocketBlock } from '../api/blocks/type'
import { SocketTx } from '../api/transaction/type'

@Component({
  components: {
    BlockSearchBox,
    LineChart,
    countTo,
    SocketBlocksCard,
    SocketTxCard,
    FulfillingSquareSpinner,
  },
})
export default class Home extends Vue {
  swiperOption = {
    loop: false,
    watchSlidesVisibility: true,
    slidesPerView: 4,
    spaceBetween: 30,
    breakpoints: {
      575.98: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      767.98: {
        slidesPerView: 2,
      },
      991.98: {
        slidesPerView: 3,
      },
      1199.98: {
        slidesPerView: 4,
      },
    },
  }

  sevenDaysTx: TransactionStats[] | null = null
  blocks: Blocks = {} as Blocks
  txDate: string[] = []
  txCount: number[] = []

  // For counting animation
  startedSupply = 0
  startedDifficulty = 0
  startedWeight = 0
  startedBlock = 0

  blockLoading = false
  newBlockHeight = 0

  async mounted() {
    const info = await statusModule.getInfo()
    const stakingInfo = await statusModule.getStakingInfo()
    const supply = await statusModule.getTotalSupply()
    // this.blocks = await blocksModule.getBlocksWithLimit(5)

    this.sevenDaysTx = await statisticsModule.getTransactionStats('8')
    this.sevenDaysTx = this.sevenDaysTx.slice(1, this.sevenDaysTx.length)
    this.txDate = this.sevenDaysTx
      .map((tx) => {
        return toMonthDayFormat(tx.date.toString())
      })
      .reverse()
    this.txCount = this.sevenDaysTx.map((tx) => tx.transaction_count).reverse()

    this.startedSupply = Number(supply)
    this.startedDifficulty = this.info.difficulty['proof-of-stake']
    this.startedWeight = this.stakingInfo.netstakeweight / Math.pow(10, 8)
    this.startedBlock = this.info.blocks

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

  get socketBlock(): SocketBlock[] {
    return blocksModule.state.socketBlock
  }

  get checkSocketBlock() {
    return this.socketBlock.length > 0
  }

  get socketTx(): SocketTx[] {
    return txModule.state.socketTx
  }

  blockDetailToBlocks(blockD: BlockDetail) {
    let block: Block = {
      height: blockD.height,
      size: blockD.size,
      hash: blockD.hash,
      time: blockD.time,
      txlength: blockD.tx.length,
      poolInfo: blockD.poolInfo,
      isMainChain: blockD.isMainChain,
      minedBy: blockD.minedBy,
    }

    return block
  }

  getFinalSupply(height: number) {
    const themisHeightMainnet = 870000
    const themisHeightTestnet = 929300

    if (this.info.testnet && height > themisHeightTestnet) {
      return this.statusState.finalSupplyThemis
    }

    if (!this.info.testnet && height > themisHeightMainnet) {
      return this.statusState.finalSupplyThemis
    }

    return this.statusState.finalSupply
  }

  @Watch('statusState.info')
  fsChanged(val: any) {
    // console.log('changed')
    setTimeout(() => {
      this.startedSupply = Number(this.statusState.supply)
    }, 6000)
    setTimeout(() => {
      this.startedDifficulty = this.info.difficulty['proof-of-stake']
      this.startedWeight = this.stakingInfo.netstakeweight / Math.pow(10, 8)
      this.startedBlock = this.info.blocks
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.show-supply-idle {
  background: linear-gradient(296deg, #4d1b63, #7e3d9a, #8739a8, #4d1b63, #7704a7, #4d1b63);
  background-size: 400% 400%;

  -webkit-animation: idle-gradient 20s ease infinite;
  -moz-animation: idle-gradient 20s ease infinite;
  animation: idle-gradient 20s ease infinite;
  .text-style-2 {
    font-size: 16px;
  }

  .supply-label {
    font-size: 14px;
  }
}

.loading-block {
  text-align: center;
  padding: 1.8rem !important;

  .loading-spinner {
    margin: 2.75rem;
  }
}

.swiper-container {
  background: #00000029;
  padding: 1rem;
  border-radius: 8px;
}

.swiper-wrapper {
  .swiper-slide::after {
    content: '';
    display: block;
    height: 15px;
    background: #34363e;
    position: absolute;
    left: 0;
    right: -500%;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }
}

@-webkit-keyframes idle-gradient {
  0% {
    background-position: 1% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 1% 0%;
  }
}
@-moz-keyframes idle-gradient {
  0% {
    background-position: 1% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 1% 0%;
  }
}
@keyframes idle-gradient {
  0% {
    background-position: 1% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 1% 0%;
  }
}
</style>
