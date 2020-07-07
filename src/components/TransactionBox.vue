<template>
  <div class="block-global p-3 my-3 rounded-lg mb-6">
    <b-row class="align-items-end mb-3">
      <b-col cols="12" md class="text-truncate">
        <i
          class="fas pr-2 more-icon"
          :class="moreDetail ? 'fa-minus-square' : 'fa-plus-square'"
          @click="toggleMore"
        ></i>
        <span class="tx-id" v-if="txPage">{{ tx.txid }}</span>
        <router-link
          class="tx-id"
          v-else
          :to="{ name: 'transaction', params: { hash: tx.txid } }"
        >{{ tx.txid }}</router-link>
      </b-col>
      <b-col
        cols="12"
        md
        class="text-md-right small text-center text-purple-light font-weight-bold"
      >{{ $t('components.transaction_box.mined') }} {{ tx.time | timeFormat('LLL') }}</b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="12">
        <b-row class="justify-content-center no-gutters">
          <b-col cols="12" lg>
            <!-- Coin based -->
            <div v-if="tx.isCoinBase">
              <b-row
                class="align-items-center no-gutters"
                v-for="(vout, index) in tx.vout"
                :key="index"
              >
                <b-col cols="8" class="text-truncate user-address">Unparsed address [{{ index }}]</b-col>
                <b-col cols="4" class="addr-value">{{ Number(vout.value).toFixed(3) }} ECOC</b-col>
                <b-collapse v-model="moreDetail" class="tx-collapse">
                  <b-row class="more-tx-info">
                    <b-col class="font-weight-bold ml-1">{{ $t('components.transaction_box.type') }}</b-col>
                  </b-row>
                  <b-row class="more-tx-info pb-1">
                    <b-col class="font-weight-bold ml-1">scriptPubKey</b-col>
                    <b-col class="text-right mr-3 text-truncate">{{ vout.scriptPubKey.asm }}</b-col>
                  </b-row>
                </b-collapse>
              </b-row>
            </div>

            <!-- Award / Normal Transaction -->
            <div v-else>
              <b-row
                class="align-items-center no-gutters"
                v-for="(vin, index) in simpleVinTx"
                :key="index"
              >
                <template v-if="checkDuplicatedAddress(vin)">
                  <b-col cols="8" class="text-truncate">
                    <router-link
                      class="user-address"
                      :to="{ name: 'address', params: { addr: vin.addr } }"
                    >{{ vin.addr }}</router-link>
                  </b-col>
                  <b-col
                    cols="4"
                    class="addr-value"
                    v-if="!moreDetail && vin.sumValue"
                  >{{ vin.sumValue.toFixed(3) }} ECOC</b-col>
                  <b-col cols="4" class="addr-value" v-else>{{ vin.value.toFixed(3) }} ECOC</b-col>
                  <b-collapse v-model="moreDetail" class="tx-collapse">
                    <b-row class="more-tx-info pb-1">
                      <b-col
                        class="font-weight-bold ml-1"
                      >{{ $t('components.transaction_box.confirm') }}</b-col>
                      <b-col class="text-right mr-3">{{ tx.confirmations | numberWithCommas }}</b-col>
                    </b-row>
                    <div v-if="vin.items.length > 0">
                      <b-row v-for="(val, index) in vin.items" :key="index" class="duplicated-addr">
                        <b-col class="tx-detail tx-dup-addr">{{ val.addr }}</b-col>
                        <b-col
                          class="tx-detail text-right tx-dup-addr"
                        >{{ val.value.toFixed(3) }} ECOC</b-col>
                      </b-row>
                    </div>
                  </b-collapse>
                </template>
              </b-row>
            </div>
          </b-col>

          <b-col cols="12" lg="1" class="text-center">
            <b-icon-arrow-right-short class="h3 mb-0 rotate-md-90"></b-icon-arrow-right-short>
          </b-col>
          <b-col cols="12" lg>
            <div v-if="tx.isCoinBase">{{ $t('components.transaction_box.no_input') }}</div>

            <div v-else>
              <b-row
                class="align-items-center no-gutters"
                v-for="(vout, index) in simpleVoutTx"
                :key="index"
              >
                <template v-if="checkVoutDuplicatedAddress(vout)">
                  <b-col cols="8" class="text-truncate">
                    <router-link
                      class="user-address"
                      v-if="'addresses' in vout.scriptPubKey"
                      :to="{ name: 'address', params: { addr: vout.scriptPubKey.addresses[0] } }"
                    >{{ vout.scriptPubKey.addresses[0] }}</router-link>
                    <span v-else>{{ `Unparsed address ${index}` }}</span>
                  </b-col>
                  <b-col
                    cols="4"
                    class="addr-value"
                    v-if="!moreDetail && vout.sumValue"
                  >{{ vout.sumValue.toFixed(3) }} ECOC (U)</b-col>
                  <b-col
                    cols="4"
                    class="addr-value"
                    v-else
                  >{{ Number(vout.value).toFixed(3) }} ECOC (U)</b-col>
                  <b-collapse v-model="moreDetail" class="tx-collapse">
                    <b-row class="more-tx-info">
                      <b-col
                        class="font-weight-bold ml-1"
                      >{{ $t('components.transaction_box.type') }}</b-col>
                      <b-col
                        class="text-right mr-3"
                      >{{ 'type' in vout.scriptPubKey ? vout.scriptPubKey.type : '' }}</b-col>
                    </b-row>
                    <b-row class="more-tx-info pb-1">
                      <b-col class="font-weight-bold ml-1">scriptPubKey</b-col>
                      <b-col class="text-right mr-3 text-truncate">{{ vout.scriptPubKey.asm }}</b-col>
                    </b-row>
                    <b-row v-for="(val, index) in vout.items" :key="index" class="duplicated-addr">
                      <b-col class="tx-detail tx-dup-addr">{{ parsingAddress(val) }}</b-col>
                      <b-col
                        class="tx-detail text-right tx-dup-addr"
                      >{{ Number(val.value).toFixed(3) }} ECOC</b-col>
                    </b-row>
                  </b-collapse>
                </template>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <template v-if="tkEvent.length > 0">
      <div v-for="(event, index) in tkEvent" :key="index">
        <hr />
        <b-row>
          <b-col cols="12" class="text-center mb-3">
            <div class="token-label">
              <router-link to="/token" class="token-name">{{ event.contractInfo.name }}</router-link>
              <span class="small text-purple-light pl-2">( ECRC20 )</span>
            </div>
          </b-col>
          <b-col cols="12">
            <b-row class="justify-content-center align-items-center no-gutters">
              <b-col cols="12" lg>
                <b-row class="align-items-center no-gutters">
                  <b-col cols="8" class="text-truncate">
                    <router-link
                      to="/address"
                      class="d-block text-truncate user-address"
                    >{{ event.addressFrom }}</router-link>
                  </b-col>
                  <b-col
                    cols="4"
                    class="text-right small text-purple-light"
                  >{{ event.amount | numberWithCommas({decimal: 8}) }} BCST</b-col>
                </b-row>
              </b-col>
              <b-col cols="12" lg="1" class="text-center">
                <b-icon-arrow-right-short class="h3 mb-0 rotate-md-90"></b-icon-arrow-right-short>
              </b-col>
              <b-col cols="12" lg>
                <b-row class="align-items-center no-gutters">
                  <b-col cols="8" class="text-truncate">
                    <router-link
                      to="/address"
                      class="d-block text-truncate user-address"
                    >{{ event.addressTo }}</router-link>
                  </b-col>
                  <b-col
                    cols="4"
                    class="text-right small text-purple-light"
                  >{{ event.amount | numberWithCommas({decimal: 8}) }} BCST</b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <TokenScriptLog v-if="byteCode.length > 0" :byteCode="byteCode" :isToken="false"></TokenScriptLog>
      </div>
    </template>

    <hr />
    <b-row>
      <b-col cols="auto" class="text-md-left" v-if="tx.fees > 0">
        <div
          class="d-inline-block small text-purple-light mx-3 mr-md-0 text-uppercase"
        >{{ $t('components.transaction_box.fee') }}: {{ tx.fees.toFixed(3) }}</div>
      </b-col>
      <b-col class="text-right">
        <div
          class="d-inline-block small text-purple-light mx-3 mr-md-0 text-uppercase"
        >{{ tx.confirmations | numberWithCommas }} {{ $t('components.transaction_box.confirm') }}</div>
        <div
          class="d-inline-block small text-purple-light mx-3 mr-md-0"
        >{{ tx.valueOut.toFixed(3) }} ECOC</div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import { Vue, Component, Prop } from 'vue-property-decorator'
import TokenScriptLog from '@/components/TokenScriptLog.vue'
import ecoweb3 from '@/ecoweb3/index'
import {
  Tx,
  TxValueIn,
  TxValueOut,
  TxReceipt,
  ReceiptLog,
  TokenEvent
} from '../api/transaction/type'
import { Token } from '../api/ecrc20/type'

@Component({
  components: {
    TokenScriptLog
  }
})
export default class TransactionBox extends Vue {
  @Prop() tx!: Tx
  @Prop() txPage!: boolean

  moreDetail = false
  checkedVinAddr: string[] = []
  checkedVoutAddr: string[] = []
  duplicatedVinAddr: string[] = []
  duplicatedVoutAddr: string[] = []

  simpleVinTx: TxValueIn[] = []
  simpleVoutTx: TxValueOut[] = []
  tkEvent: TokenEvent[] = []
  byteCode = ''

  async mounted() {
    this.simpleVinTx = this.aggregateVinValue(this.tx.vin)
    this.simpleVoutTx = this.aggregateVoutValue(this.tx.vout)

    if (this.tx.isEcrc20Transfer && this.tx.receipt) {
      this.tx.receipt.forEach(async (receipt: TxReceipt) => {
        this.tkEvent = await this.processECRC20Tx(receipt)
      })

      this.byteCode = await this.getContractByteCode(this.tx.vout)
    }
  }

  toggleMore() {
    this.moreDetail = !this.moreDetail
  }

  aggregateVinValue(vin: any[]) {
    let vinTotalVal = 0
    for (let i = 0; i < vin.length; i++) {
      vinTotalVal = vin[i].value!
      vin[i].items = []

      for (let j = i + 1; j < vin.length; j++) {
        if (this.checkedVinAddr.includes(vin[i].addr!)) {
          continue
        }

        if (vin[i].addr === vin[j].addr) {
          vinTotalVal += vin[j].value!
          vin[i].items.push(vin[j])

          if (!this.duplicatedVinAddr.includes(vin[i].addr)) {
            this.duplicatedVinAddr.push(vin[i].addr)
          }
        }
      }

      if (vinTotalVal !== vin[i].value) {
        vin[i].sumValue = vinTotalVal
      }

      if (!this.checkedVinAddr.includes(vin[i].addr)) {
        this.checkedVinAddr.push(vin[i].addr)
      }
    }

    return vin
  }

  aggregateVoutValue(vout: any[]) {
    let voutTotalVal = 0
    for (let i = 0; i < vout.length; i++) {
      if (vout[i].scriptPubKey && vout[i].scriptPubKey.addresses) {
        voutTotalVal = Number(vout[i].value)
        vout[i].items = []
        let voutAddr = vout[i].scriptPubKey.addresses[0]

        for (let j = i + 1; j < vout.length; j++) {
          if (this.checkedVoutAddr.includes(voutAddr)) {
            continue
          }

          if (voutAddr === vout[j].scriptPubKey.addresses[0]) {
            voutTotalVal += Number(vout[j].value)
            vout[i].items.push(vout[j])

            if (!this.duplicatedVoutAddr.includes(voutAddr)) {
              this.duplicatedVoutAddr.push(voutAddr)
            }
          }
        }

        if (voutTotalVal !== Number(vout[i].value)) {
          vout[i].sumValue = voutTotalVal
        }

        if (!this.checkedVoutAddr.includes(voutAddr)) {
          this.checkedVoutAddr.push(voutAddr)
        }
      }
    }

    return vout
  }

  checkDuplicatedAddress(txVal: any) {
    // vin
    if (this.duplicatedVinAddr.includes(txVal.addr)) {
      return txVal.items.length > 0
    }
    // display non-duplicated address also
    return true
  }

  checkVoutDuplicatedAddress(txVal: any) {
    txVal = JSON.parse(JSON.stringify(txVal))
    if (txVal.scriptPubKey.addresses) {
      let scPubKey = JSON.parse(JSON.stringify(txVal.scriptPubKey.addresses))
      if (this.duplicatedVoutAddr.includes(scPubKey[0])) {
        return txVal.items.length > 0
      }
    }
    // display non-duplicated address also
    return true
  }

  parsingAddress(val: any) {
    val = JSON.parse(JSON.stringify(val.scriptPubKey.addresses))
    return val[0]
  }

  async processECRC20Tx(receipt: TxReceipt) {
    let tokenEvent: TokenEvent = {} as TokenEvent
    let events: TokenEvent[] = []

    receipt.log.forEach(async (log: ReceiptLog) => {
      tokenEvent = await ecoweb3.parseTokenTxEvent(log)
      events.push(tokenEvent)
    })

    return events
  }

  async getContractByteCode(txValueOut: TxValueOut[]) {
    let bytecode = ''

    for (let vout of txValueOut) {
      if (vout.scriptPubKey && vout.scriptPubKey.hex) {
        const decodedByteCode = await ecoweb3.getContractByteCode(vout.scriptPubKey.hex)
        if (decodedByteCode) {
          return decodedByteCode['code']
        }
      }
    }

    return ''
  }
}
</script>

<style lang="scss" scoped>
.toggle-more {
  cursor: pointer;
}

.tx-detail {
  font-size: smaller;
  color: rgb(198, 198, 198);
  overflow: hidden;
  text-overflow: ellipsis;
}

.tx-collapse {
  background: rgb(18, 20, 33);
  overflow: hidden;
  border-radius: 6px;
  margin-top: 0.75rem;
  margin-bottom: 1.4rem;
  margin-left: 0.75rem;
  padding-top: 0.75rem;
  padding-left: 1rem;
  width: -webkit-fill-available;
}

.addr-value {
  text-align: right;
  color: #4d465f;
  align-self: baseline;
  font-size: 80%;
  font-weight: 400;
}

.duplicated-addr {
  padding: 6px;
  background: #0f111b;
  margin-right: 0px;
}

.tx-dup-addr {
  color: #4a4c54;
}

.more-tx-info {
  margin-bottom: 7px;
  font-size: small;
}

.token-label {
  padding: 0.5rem;
  background: #11131b;
  border-radius: 6px;
}

.more-icon {
  color: $purple;
}

@media (max-width: 575px) {
  .token-name,
  .user-address,
  .tx-id {
    font-size: 14px;
  }

}
</style>
