import Vue from 'vue'
import Vuex, { ActionTree, GetterTree } from 'vuex'
// import Axios from 'axios'

Vue.use(Vuex)

function getBaseURL() {
  return "https://explorer.ecoc.io/api"
}

export interface InitState {
  ecocApiUrl: String
}

function defaultState(): InitState {
  return {
    ecocApiUrl: getBaseURL()
  }
}

const getters: GetterTree<InitState, InitState> = {
  ecocApiUrl: state => state.ecocApiUrl
}

const actions: ActionTree<InitState, InitState> = {

}

export default new Vuex.Store<InitState>({
  state: defaultState(),
  actions,
  getters,
})
