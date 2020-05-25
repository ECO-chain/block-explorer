import Vue from 'vue'
import App from './App.vue'

import router from './routes';
import { store } from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// vue-awesome-swiper
// https://github.com/surmon-china/vue-awesome-swiper

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
