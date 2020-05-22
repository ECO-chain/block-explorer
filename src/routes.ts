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

const routes = [
    { path: '/', component: Home },
    { path: '/blocks', component: Blocks },
    { path: '/status', component: Status },
    { path: '/stats', component: Stats },
    { path: '/charts', component: Charts },
    { path: '/tokens', component: Tokens },
    { path: '/rich-list', component: RichList },
    { path: '/address', component: Address },
    { path: '/block', component: Block },
    { path: '/stats/outputs', component: Outputs },
    { path: '/token', component: Token },
    { path: '/tx', component: Transaction },
];

export default routes;