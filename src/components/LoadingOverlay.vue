<template>
  <div class="loading-backdrop" :class="[showBackdrop ? 'with-backdrop' : '']">
    <div class="load-container">
      <breeding-rhombus-spinner :animation-duration="2000" :size="65" color="#ffffff" />
      <h6 class="loading-text mt-3">Data is now currently fetching, please wait</h6>
      <p>{{ message || 'This could take several minutes' }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { BreedingRhombusSpinner } from 'epic-spinners'

@Component({
  components: {
    BreedingRhombusSpinner
  },
  props: {
    showBackdrop: Boolean,
    message: String
  }
})
export default class LoadingSpinner extends Vue {
  loading: boolean = true
}
</script>
<style scoped lang="scss">
.loading-backdrop {
  position: absolute;
  display: flex;
  align-content: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 9999;
}

.with-backdrop {
  position: fixed !important;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
}

.load-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;

  p {
    font-size: 12px;
    font-weight: 600;
  }
}

.loading-text {
  margin-top: 1rem;
  font-weight: 600;
  background: -webkit-linear-gradient(#b100ff, #cccccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
