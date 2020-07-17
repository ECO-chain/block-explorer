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

import blocksModule from '@/api/blocks/index'
import ecoweb3 from '@/ecoweb3/index'
import addressModule from '@/api/address/index'
import txModule from '@/api/transaction/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: "home",
      component: Home,
      beforeEnter: async (to, from, next) => {
        await blocksModule.getInitialSocketBlock()
        next()
      }
    },
    {
      path: '/blocks/:date?',
      name: 'blocks',
      component: Blocks,
      props: true,
      beforeEnter: (to, from, next) => {
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
      props: true,
      beforeEnter: async (to, from, next) => {
        const addr = to.params.addr
        const isValidAddress = await ecoweb3.isEcoAddress(to.params.addr)
        if (isValidAddress) {
          const summary = await addressModule.getAddressSummary(to.params.addr)
          if (summary instanceof Error) {
            next(new Error('Not available address / Invalid address'))
          } else {
            next()
          }
        } else {
          const ecoAddr = await ecoweb3.getBitAddressFromContractAddress(to.params.addr)
          const summary = await addressModule.getAddressSummary(ecoAddr)
          if (summary instanceof Error) {
            next(new Error('Not available address / Invalid address'))
          } else {
            next()
          }
        }
      }
    },
    {
      path: '/block/:hash',
      name: 'block',
      component: Block,
      props: true,
      beforeEnter: async (to, from, next) => {
        const block = await blocksModule.getBlockDetail(to.params.hash)
        if (block instanceof Error) {
          next(new Error('Invalid Block hash'))
        } else {
          next()
        }
      }
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
      props: true,
      beforeEnter: async (to, from, next) => {
        const tx = await txModule.getTransactionByHash(to.params.hash)
        if (tx instanceof Error) {
          next(new Error('Invalid Transaction hash'))
        } else {
          next()
        }
      }
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
