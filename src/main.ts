import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import routes from './routes';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// vue-awesome-swiper
// https://github.com/surmon-china/vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter({routes});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
})
