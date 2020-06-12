<template>
  <b-row>
    <b-col cols="12">
      <b-card class="block-global mb-3 rounded-lg token-tracker">
        <b-row>
          <b-col cols="2">
            <div class="token-sym text-center font-weight-bold">BCST</div>
          </b-col>
          <b-col cols="8">
            <b-row class="font-weight-bold">BLOCKCHAINSTORE TOKEN</b-row>
            <b-row class="token-amount">
              60824800.718799
              <span class="ml-2">BCST</span>
            </b-row>
          </b-col>
          <b-col cols="2" class="text-md-right">RANK #1</b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class TokenTracker extends Vue {

}
</script>

<style lang="scss" scoped>
.token-tracker {
  .token-sym {
    background-image: linear-gradient(to right bottom, #69006e, #4d1a5f, #36204c, #262035, #1c1c1c);
    padding: 0.75rem;
    border-radius: 7px;
  }

  .token-amount {
    color: #6d6d6d;
  }
}
</style>
