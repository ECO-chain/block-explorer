<template>
  <div class="container-fill-height">
    <b-container>
      <div class="pt-5 text-uppercase text-center">
        <div v-if="msg" class="error-msg">
          <i class="fas fa-exclamation-circle"></i>
          {{ msg }}
        </div>
        <h1>404</h1>
        <h2>{{ $t('views.not_found.page_not_found') }}</h2>
        <hr />
        <b-button
          class="mt-3 text-uppercase"
          @click="backToHome"
        >{{ $t('views.not_found.to_home') }}</b-button>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class NotFound extends Vue {
  @Prop() msg!: string

  backToHome() {
    this.$router.push({ name: 'home' })
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 150px;
  font-weight: bold;
  background: -webkit-linear-gradient(rgb(173, 59, 222) 0%, rgb(113, 19, 131) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  font-weight: 600;
  letter-spacing: 4px;
  margin-top: -1.5rem;
}

.error-msg {
  padding: 0.5rem;
  background: #ad3c3c;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 0.75rem;
  font-weight: 600;
}
</style>
