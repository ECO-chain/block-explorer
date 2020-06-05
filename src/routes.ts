import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home.vue'
import Blocks from './pages/Blocks.vue'
import Status from './pages/Status.vue'
import Stats from './pages/Stats.vue'
import Charts from './pages/Charts.vue'
import Tokens from './pages/Tokens.vue'
import RichList from './pages/RichList.vue'
import Address from './pages/Address.vue'
import Block from './pages/Block.vue'
import Outputs from './pages/Outputs.vue'
import Token from './pages/Token.vue'
import Transaction from './pages/Transaction.vue'

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
        path: '/blocks',
        name: 'blocks',
        component: Blocks,
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
        path: '/rich-list',
        name: 'richList',
        component: RichList,
      },
      {
        path: '/address',
        name: 'address',
        component: Address,
      },
      {
        path: '/block',
        name: 'block',
        component: Block,
      },
      {
        path: '/stats/outputs',
        name: 'outputs',
        component: Outputs,
      },
      {
        path: '/token',
        name: 'token',
        component: Token,
      },
      {
        path: '/tx',
        name: 'transaction',
        component: Transaction,
      }
    ]
})

export default router;
