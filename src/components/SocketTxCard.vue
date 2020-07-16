<template>
  <b-card footer-tag="footer" :class="tx.loading ? '' : 'scale-in-center'">
    <p class="tx-time">{{ Date.now() | timeFromNow }}</p>
    <div class="tx-detail">
      <p class="tx-label">Hash</p>
      <div class="text-truncate user-address" @click="toTransaction(tx.txid)">{{ tx.txid }}</div>
    </div>
    <template v-slot:footer>
      <p class="tx-type">{{ txType }}</p>
      <span class="tx-value">{{ tx.valueOut | numberWithCommas({fixed: 3}) }} ECOC</span>
    </template>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import txModule from '@/api/transaction/index'
// eslint-disable-next-line no-unused-vars
import { SocketTx } from '../api/transaction/type'

@Component
export default class SocketTxCard extends Vue {
  @Prop() tx!: SocketTx

  toTransaction() {
    console.log('onward!!!')
  }

  updated() {
    setTimeout(() => {
      txModule.setLoading({tx: this.tx, state: false})
    }, 100)
  }

  get txType() {
    return this.tx.vout.length > 0 ? 'Transfer' : 'Coinbase'
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

.card-footer {
  text-align: center;
  background: #1c1e2b;
}

.tx-time {
  text-align: center;
  font-size: 12px;
  color: #83808c;
}

.tx-detail {
  text-align: center;

  .tx-label {
    font-size: 14px;
    color: #7e8088;
    font-weight: 600;
    margin-bottom: -0.3rem !important;
  }

  .user-address {
    font-size: 12px;
    color: $purple;
    cursor: pointer;
  }
}

.tx-value {
  font-size: 12px;
  font-weight: 600;
}

.tx-type {
  background: linear-gradient(0deg, #9743bb 0%, rgb(183, 16, 204) 100%);
  -webkit-background-clip: text;
  font-size: 11px;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: -0.2rem !important;
}

.scale-in-center {
	-webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}

</style>
