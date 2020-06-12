<template>
  <b-row>
    <b-col cols="12" md="6">
      <div class="block-scroll p-3 my-3 rounded-lg">
        <h4 class="text-style-1 text-uppercase mb-2">Contract Code</h4>
        <div
          class="content-scroll text-break small"
        >a9059cbb000000000000000000000000de67b0b340e26adbae625982f85da6de0ec0537e000000000000000000000000000000000000000000000000000000bc7652f5c0</div>
      </div>
    </b-col>
    <b-col cols="12" md="6">
      <div class="block-scroll p-3 my-3 rounded-lg">
        <h4 class="text-style-1 text-uppercase mb-2">Asm</h4>
        <div class="content-scroll text-break small">
          INVALID SDIV SWAP13 INVALID STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP
          STOP STOP INVALID PUSH8 0xb0b340e26adbae62 MSIZE DUP3 INVALID INVALID INVALID
          INVALID INVALID INVALID MSTORE8 PUSH31
          0x000000000000000000000000000000000000000000000000000000bc7652f5 INVALID
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class TxScriptLog extends Vue {

}
</script>

<style lang="scss" scoped>
</style>
