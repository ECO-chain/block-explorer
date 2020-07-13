import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home.vue'
import Blocks from './pages/Blocks.vue'
import Status from './pages/Status.vue'
import Stats from './pages/Stats.vue'
import Charts from './pages/Charts.vue'
import Tokens from './pages/Tokens.vue'
import RichestList from './pages/RichestList.vue'
import Address from './pages/Address.vue'
import Block from './pages/Block.vue'
import Token from './pages/Token.vue'
import Transaction from './pages/Transaction.vue'
import NotFound from './pages/NotFound.vue'
import { isBlocksDateFormat } from './api/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: "home",
      component: Home,
    },
    {
      path: '/blocks/:date?',
      name: 'blocks',
      component: Blocks,
      props: true,
      beforeEnter: (to, from, next) => {
        console.log(to.params.date)
        if (isBlocksDateFormat(to.params.date)) {
          next();
        } else {
          next(new Error('Invalid date format'))
        }
      }
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
    },
    {
      path: '/charts',
      name: 'charts',
      component: Charts,
      props: true
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: Tokens
    },
    {
      path: '/richest-list',
      name: 'richestList',
      component: RichestList,
    },
    {
      path: '/address/:addr',
      name: 'address',
      component: Address,
      props: true
    },
    {
      path: '/block/:hash',
      name: 'block',
      component: Block,
      props: true
    },
    {
      path: '/token/:addr',
      name: 'token',
      component: Token,
      props: true
    },
    {
      path: '/tx/:hash',
      name: 'transaction',
      component: Transaction,
      props: true
    },
    {
      path: '/*',
      props: true,
      beforeEnter: (to, from, next) => {
        router.push({ name: 'notfound' })
      }
    },
    {
      path: '/error',
      name: 'notfound',
      component: NotFound,
      props: true
    }
  ]
})

router.onError(error => {
  router.push({ name: 'notfound', params: { msg: error.message } })
})

export default router;
