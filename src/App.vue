<template>
  <div id="app" class="bg-space">
    <BlockHeader />
    <router-view />
    <BlockFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BlockHeader from "./components/Header.vue";
import BlockFooter from "./components/Footer.vue";

@Component({
  components: {
    BlockFooter,
    BlockHeader
  }
})
export default class App extends Vue {

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
