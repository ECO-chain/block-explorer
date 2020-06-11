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
                  <router-link to="/address">Unparsed address [{{ index }}]</router-link>
                  <b-collapse v-model="moreDetail" class="tx-collapse">
                    <p class="tx-detail">Type</p>
                    <p class="tx-detail">scriptPubKey {{ vout.scriptPubKey.asm }}</p>
                  </b-collapse>
                </b-col>
                <b-col cols="4" class="text-right small text-purple-light">{{ vout.value }} ECOC</b-col>
              </b-row>
            </div>

            <!-- Award / Normal Transaction -->
            <div v-else>
              <b-row
                class="align-items-center no-gutters"
                v-for="(vin, index) in tx.vin"
                :key="index"
              >
                <b-col cols="8" class="text-truncate">
                  <router-link to="/address">{{ vin.addr }}</router-link>
                  <b-collapse v-model="moreDetail" class="tx-collapse">
                    <p class="tx-detail">Confirmations: {{ tx.confirmations }}</p>
                  </b-collapse>
                </b-col>
                <b-col cols="4" class="text-right small text-purple-light">{{ vin.value }} ECOC</b-col>
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
                v-for="(vout, index) in tx.vout"
                :key="index"
              >
                <b-col cols="8" class="text-truncate">
                  <router-link
                    to="/address"
                  >{{ 'addresses' in vout.scriptPubKey ? vout.scriptPubKey.addresses[0] : `Unparsed address ${index}` }}</router-link>
                  <b-collapse v-model="moreDetail" class="tx-collapse">
                    <p
                      class="tx-detail"
                    >Type {{ 'type' in vout.scriptPubKey ? vout.scriptPubKey.type : '' }}</p>
                    <p class="tx-detail">scriptPubKey {{ vout.scriptPubKey.asm }}</p>
                  </b-collapse>
                </b-col>
                <b-col cols="4" class="text-right small text-purple-light">{{ vout.value }} ECOC (U)</b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md class="text-center text-md-right">
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
// eslint-disable-next-line no-unused-vars
import { Tx, TxValueIn } from '../api/transaction/type'

@Component({})
export default class TransactionBox extends Vue {
  @Prop() tx!: Tx
  @Prop() txPage!: boolean

  moreDetail = false

  mounted() {}
  toggleMore() {
    this.moreDetail = !this.moreDetail
  }

  // duplicatedValueInAddr(vin: TxValueIn[]) {
  //   // eslint-disable-next-line no-unused-vars
  //   let vinTotalVal = 0
  //   // eslint-disable-next-line no-unused-vars
  //   let newObj = {}
  //   for (let i = 0; i < vin.length; i++) {
  //     for (let j = i+1; j < vin.length; j++) {
  //       if (vin[i].addr === vin[j].addr) {
  //         vinTotalVal += vin[i].value! + vin[j].value!
  //         newObj = Object.assign(vin[i], vin[j])
  //         dupVin.push(vin[j])
  //         vin.splice(j, i)
  //       }
  //     }
  //   }

  //   console.log('dupVin', dupVin)
  //   console.log('vin', vin)
  // }
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
</style>
