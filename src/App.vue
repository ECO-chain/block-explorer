<template>
  <div id="app" class="bg-space">
    <BlockHeader />
    <router-view />
    <BlockFooter />
  </div>
</template>

<script>
import BlockHeader from "./components/Header";
import BlockFooter from "./components/Footer";


export default {
  name: "App",
  components: {
    BlockHeader,
    BlockFooter,
  },
  data() {
    return {
    };
  },
  mounted: function() {
  },
  computed: {},
  methods: {}
};
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
