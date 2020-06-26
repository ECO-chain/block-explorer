import Vue from 'vue'
import App from './App.vue'

import router from './routes';
import { store } from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { initFilters } from '@/api/filters'

import { i18n } from "./i18n"
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io('http://localhost:3001/');

Vue.use(VueSocketIOExt, socket);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

initFilters()

export default new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app")
