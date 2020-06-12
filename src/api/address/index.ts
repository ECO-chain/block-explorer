import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import { env } from '@/config'
import { AddressState, AddressSummary } from './type'

const initialState: AddressState = {}
const builder = getStoreBuilder<RootState>().module('addr', initialState)
const stateGetter = builder.state()

const addressModule = {
  get state() {
    return stateGetter
  },

  getAddressSummary: builder.dispatch(getAddressSummary)
}

export default addressModule

declare type ActionContext = BareActionContext<AddressState, RootState>

async function getAddressSummary(context: ActionContext, addr: string): Promise<AddressSummary> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/addr/${addr}`)
    return res.data
  } catch (e) {
    return e
  }
}
