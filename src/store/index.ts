import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { getStoreBuilder } from 'vuex-typex'
import { RootState } from './types'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const builder = getStoreBuilder<RootState>()

export const store: Store<RootState> = builder.vuexStore({
  plugins: [createPersistedState()]
})
