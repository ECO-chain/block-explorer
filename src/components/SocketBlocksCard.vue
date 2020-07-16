<template>
  <b-card
    footer-tag="footer"
    header-tag="header"
    class="text-center"
    :class="socket.loading ? '' : 'slide-in-left'"
  >
    <template v-slot:header>
      <b-card-title class="to-block" @click="toBlock(socket.block.height)">{{ socket.block.height }}</b-card-title>
    </template>
    <p class="label-mined">{{ $t('views.home.swiper.blocks.mined_by') }}</p>
    <div
      class="to-miner text-truncate"
      @click="toMiner(socket.block.minedBy)"
    >{{ socket.block.minedBy }}</div>
    <b-row>
      <b-col class="text-center">
        <div class="block-detail">{{ socket.block.tx.length }}</div>
        <p class="label-detail">{{ isMobileDevice ? $t('views.home.swiper.blocks.txs') : $t('views.home.swiper.blocks.tx')}}</p>
      </b-col>
      <b-col class="text-center">
        <div class="block-detail text-truncate">{{ socket.block.size }}</div>
        <p class="label-detail">{{ $t('views.transaction.bytes') }}</p>
      </b-col>
    </b-row>
    <template v-slot:footer>
      <span>{{ (socket.block.time * 1000) | timeFromNow }}</span>
    </template>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import blocksModule from '@/api/blocks/index'
// eslint-disable-next-line no-unused-vars
import { BlockDetail, SocketBlock } from '../api/blocks/type'

@Component
export default class SocketBlocksCard extends Vue {
  @Prop() socket!: SocketBlock

  updated() {
    setTimeout(() => {
      blocksModule.setLoading({ block: this.socket, state: false })
    }, 100)
  }

  toMiner(addr: string) {
    this.$router.push({ name: 'address', params: { addr } })
  }

  toBlock(hash: string) {
    this.$router.push({ name: 'block', params: { hash } })
  }

  get isMobileDevice() {
    return window.innerWidth <= 473
  }
}
</script>

<style lang="scss" scoped>
.card {
  background: #141826 !important;
  border: 0 !important;
  border-radius: 6px !important;
  box-shadow: 0 6px 12px #080808;
  position: relative;
  overflow: hidden;
}

.card-header {
  border-bottom: 1px solid rgba(162, 162, 162, 0.125) !important;
  background: #141826 !important;
}

.card-body {
  padding-bottom: 0 !important;
}

.card-title {
  margin-bottom: 0 !important;
}

.card-footer {
  background: #1c1e2b;
  padding: 0.3rem !important;

  span {
    font-size: 12px;
  }
}

.to-block {
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(0deg, #9743bb 0%, rgb(183, 16, 204) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

.to-miner {
  cursor: pointer;
  color: $purple;
  font-size: 12px;
  padding-bottom: 1rem;
}

.blocks-label {
  color: #83808c;
  font-weight: 600;
  font-size: 11px;
}

.block-detail {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: -0.3rem !important;
}

.label-mined {
  @extend .blocks-label;
  margin-bottom: 0.3rem !important;
}

.label-detail {
  @extend .blocks-label;
}

// animation

.slide-in-left {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: slide-in-left 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
