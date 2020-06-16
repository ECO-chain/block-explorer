<template>
  <div class="block-global p-3 my-3 rounded-lg">
    <b-row class="align-items-end mb-3">
      <b-col cols="12" md class="text-truncate">
        <b-icon
          class="mr-2 toggle-more"
          :icon="moreDetail ? 'dash-square' : 'plus-square'"
          @click="toggleMore"
        ></b-icon>
        <span v-if="txPage">{{ tx.txid }}</span>
        <router-link v-else :to="{ name: 'transaction', params: { hash: tx.txid } }">{{ tx.txid }}</router-link>
      </b-col>
      <b-col cols="12" md class="text-md-right small">mined {{ tx.time | timeFormat('LLL') }}</b-col>
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
                <b-col cols="8" class="text-truncate">
                  Unparsed address [{{ index }}]
                  <b-collapse v-model="moreDetail" class="tx-collapse">
                    <p class="tx-detail">Type</p>
                    <p class="tx-detail">scriptPubKey {{ vout.scriptPubKey.asm }}</p>
                  </b-collapse>
                </b-col>
                <b-col cols="4" class="addr-value">{{ vout.value }} ECOC</b-col>
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
                      :to="{ name: 'address', params: { addr: vin.addr } }"
                    >{{ vin.addr }}</router-link>
                    <b-collapse v-model="moreDetail" class="tx-collapse">
                      <p class="tx-detail">Confirmations: {{ tx.confirmations }}</p>
                      <div v-if="vin.items.length > 0">
                        <div v-for="(val,index) in vin.items" :key="index">
                          <p class="tx-detail">{{ val.addr }}</p>
                          <p class="tx-detail">{{ val.value }}</p>
                        </div>
                      </div>
                    </b-collapse>
                  </b-col>
                  <b-col cols="4" class="addr-value" v-if="!moreDetail && vin.sumValue">{{ vin.sumValue }}</b-col>
                  <b-col cols="4" class="addr-value" v-else>{{ vin.value }} ECOC</b-col>
                </template>
              </b-row>
            </div>
          </b-col>

          <b-col cols="12" lg="1" class="text-center">
            <b-icon-arrow-right-short class="h3 mb-0 rotate-md-90"></b-icon-arrow-right-short>
          </b-col>
          <b-col cols="12" lg>
            <div v-if="tx.isCoinBase">No Inputs (Newly Generated Coins)</div>

            <div v-else>
              <b-row
                class="align-items-center no-gutters"
                v-for="(vout, index) in simpleVoutTx"
                :key="index"
              >
                <template v-if="checkVoutDuplicatedAddress(vout)">
                  <b-col cols="8" class="text-truncate">
                    <router-link
                      v-if="'addresses' in vout.scriptPubKey"
                      :to="{ name: 'address', params: { addr: vout.scriptPubKey.addresses[0] } }"
                    >{{ vout.scriptPubKey.addresses[0] }}</router-link>
                    <span v-else>{{ `Unparsed address ${index}` }}</span>
                    <b-collapse v-model="moreDetail" class="tx-collapse">
                      <div v-if="vout.items && vout.items.length > 0">
                        <div v-for="(val,index) in vout.items" :key="index">
                          <p class="tx-detail">{{ parsingAddress(val) }}</p>
                          <p class="tx-detail">{{ val.value }}</p>
                        </div>
                      </div>
                      <div v-else>
                        <p
                          class="tx-detail"
                        >Type {{ 'type' in vout.scriptPubKey ? vout.scriptPubKey.type : '' }}</p>
                        <p class="tx-detail">scriptPubKey {{ vout.scriptPubKey.asm }}</p>
                      </div>
                    </b-collapse>
                  </b-col>
                  <b-col cols="4" class="addr-value" v-if="!moreDetail && vout.sumValue">{{ vout.sumValue }}</b-col>
                  <b-col cols="4" class="addr-value" v-else>{{ vout.value }} ECOC (U)</b-col>
                </template>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <div v-if="tx.isEcrc20Transfer">
      <hr />
      <b-row>
        <b-col cols="12">
          <router-link to="/token">BlockChainStore Token</router-link>
          <span class="small text-purple-light">(ECRC20)</span>
        </b-col>
        <b-col cols="12">
          <b-row class="justify-content-center align-items-center no-gutters">
            <b-col cols="12" lg>
              <b-row class="align-items-center no-gutters">
                <b-col cols="8" class="text-truncate">
                  <router-link
                    to="/address"
                    class="d-block text-truncate"
                  >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                </b-col>
                <b-col cols="4" class="text-right small text-purple-light">8094.39 BCST</b-col>
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
                    class="d-block text-truncate"
                  >EK9YyB3F4zn6DVt9Ey9n3D4hDHDhzrJrtM</router-link>
                </b-col>
                <b-col cols="4" class="text-right small text-purple-light">8094.39 BCST</b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <TxScriptLog v-if="tx.isEcrc20Transfer"></TxScriptLog>
    </div>

    <hr />
    <b-row>
      <b-col md v-if="tx.fees > 0">
        <div class="d-inline-block small text-purple-light mx-3 mr-md-0">FEE: {{ tx.fees }}</div>
      </b-col>
      <b-col md class="text-center text-md-right">
        <div
          class="d-inline-block small text-purple-light mx-3 mr-md-0"
        >CONFIRMATIONS: {{ tx.confirmations }}</div>
        <div class="d-inline-block small text-purple-light mx-3 mr-md-0">{{ tx.valueOut }} ECOC</div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TxScriptLog from '@/components/TxScriptLog.vue'
// eslint-disable-next-line no-unused-vars
import { Tx, TxValueIn, TxValueOut } from '../api/transaction/type'

@Component({
  components: {
    TxScriptLog
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

  mounted() {
    this.simpleVinTx = this.aggregateVinValue(this.tx.vin)
    this.simpleVoutTx = this.aggregateVoutValue(this.tx.vout)
    console.log('now vout', this.simpleVoutTx)
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

  parsingAddress(val:any) {
    val = JSON.parse(JSON.stringify(val.scriptPubKey.addresses))
    return val[0]
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
  padding-top: 0.75rem;
  padding-left: 1rem;
}

.addr-value {
  text-align: right;
  color: #4d465f;
  align-self: baseline;
  font-size: 80%;
  font-weight: 400;
}
</style>
