import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import { env } from '@/config'
import { ContractState, ContractInfo } from './type'

const initialState: ContractState = {}
const builder = getStoreBuilder<RootState>().module('contract', initialState)
const stateGetter = builder.state()

const contractModule = {
  get state() {
    return stateGetter
  },

  getTokenContractInfo: builder.dispatch(getTokenContractInfo)
}

export default contractModule

declare type ActionContext = BareActionContext<ContractState, RootState>

async function getTokenContractInfo(context: ActionContext, contractAddr: string): Promise<ContractInfo> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/contracts/${contractAddr}`)
    return res.data
  } catch (e) {
    return e
  }
}
