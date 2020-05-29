import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import { StatusState, Status, SyncStatus, LastBlockHash, StakingInfo } from './type'
import Axios from 'axios'

function initialState(): StatusState {
  return {
    // maybe this will change later
    finalSupply: 2000000000
  }
}
const builder = getStoreBuilder<RootState>().module('status', initialState())
const stateGetter = builder.state()

const baseURL = "http://localhost:3001/api/"

const statusModule = {
  get state() {
    return stateGetter()
  },

  getStatus: builder.dispatch(getStatus),
  getSyncStatus: builder.dispatch(getSyncStatus)
}

export default statusModule

declare type ActionContext = BareActionContext<StatusState, RootState>

async function getStatus(context: ActionContext): Promise<Status> {
  try {
    const res = await Axios.get(`${baseURL}status?=getInfo`)
    return res.data['info']
  } catch (e) {
    return e
  }
}

async function getSyncStatus(context: ActionContext): Promise<SyncStatus> {
  try {
    const res = await Axios.get(`${baseURL}sync`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getLastBlockHash(context: ActionContext): Promise<LastBlockHash> {
  try {
    const res = await Axios.get(`${baseURL}status?q=getLastBlockHash`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getStakingInfo(context: ActionContext): Promise<StakingInfo> {
  try {
    const res = await Axios.get(`${baseURL}status?q=getStakingInfo`)
    return res.data
  } catch (e) {
    return e
  }
}
