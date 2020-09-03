import { CommonState } from "./type"
import { getStoreBuilder } from 'vuex-typex'
import { RootState } from '../types'

export const commonState: CommonState = {
  showLoadingSpinner: false
}

const builder = getStoreBuilder<RootState>().module('common', commonState)
const stateGetter = builder.state()

const CommonStore = {
  get state() {
    return stateGetter()
  },

  setShowLoadingSpinner: builder.commit(setShowLoadingSpinner),
}

function setShowLoadingSpinner(state: CommonState, payload: boolean) {
  state.showLoadingSpinner = payload
}

export { CommonStore }
