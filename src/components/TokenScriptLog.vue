<template>
  <b-row>
    <b-col cols="12" md="6">
      <div class="block-scroll p-3 my-3 rounded-lg">
        <h4 class="text-style-1 text-uppercase mb-2">
          {{ isToken ? 'Bytecode' : 'Contract Code' }}
        </h4>
        <div class="content-scroll text-break small">{{ byteCode }}</div>
      </div>
    </b-col>
    <b-col cols="12" md="6">
      <div class="block-scroll p-3 my-3 rounded-lg">
        <h4 class="text-style-1 text-uppercase mb-2">Asm</h4>
        <div class="content-scroll text-break small">{{ asmCode }}</div>
      </div>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ecoweb3 from '@/ecoweb3/index'

@Component({})
export default class TokenScriptLog extends Vue {
  @Prop() isToken!: boolean
  @Prop() byteCode!: string

  get asmCode() {
    return ecoweb3.getContractOpcodesString(this.byteCode)
  }
}
</script>

<style lang="scss" scoped></style>
