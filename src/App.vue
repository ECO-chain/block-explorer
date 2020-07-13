<template>
  <div id="app" class="bg-space">
    <BlockHeader />
    <transition name="fade" mode="out-in">
      <loading-overlay v-if="isLoading" :showBackdrop="true"></loading-overlay>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.params.hash || $route.params.addr" />
    </transition>
    <BlockFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BlockHeader from './components/Header.vue'
import BlockFooter from './components/Footer.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import { Socket } from 'vue-socket.io-extended'
import statusModule from '@/api/status/index'
// eslint-disable-next-line no-unused-vars
import { CommonStore } from '@/store/common/index'
// eslint-disable-next-line no-unused-vars
import { Info, StatusState } from '@/api/status/type'

@Component({
  components: {
    BlockFooter,
    BlockHeader,
    LoadingOverlay
  }
})
export default class App extends Vue {
  @Socket()
  connect() {
    // console.log('socket connected')
    this.$socket.client.emit('subscribe', 'sync')
    this.$socket.client.emit('subscribe', 'inv')
    // console.log('subscribed on sync and inv')
  }

  disconnect() {
    // console.log('socket disconnected')
    this.$socket.client.emit('unsubscribe', 'sync')
    this.$socket.client.emit('unsubscribe', 'inv')
  }

  @Socket('sync')
  onSync(payload: any) {
    console.log('receiving', payload)
  }

  @Socket('info')
  onInfo(payload: StatusState) {
    statusModule.setInfo(payload.info)
    statusModule.setStakingInfo(payload.stakingInfo)
    statusModule.setSupply(payload.supply)

    // console.log('onInfo', payload)
  }

  @Socket('markets_info')
  onMarkets(payload: any) {
    console.log('Martket', payload)
  }

  get isLoading() {
    return CommonStore.state.showLoadingSpinner
  }
}
</script>

<style lang="scss">
html,
body {
  font-family: $font-family-primary, sans-serif;
  font-size: $browser-context + px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: $grey;
}
html {
  background: $purple-dark;
}
body {
  background: $purple-blue;
  padding-top: 60px;
}
</style>
