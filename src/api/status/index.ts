import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import { StatusState, Info, SyncStatus, LastBlockHash, StakingInfo } from './type'
import * as mutations from './mutations'
import Axios from 'axios'

function initialState(): StatusState {
  return {
    // maybe this will change later
    finalSupply: 2000000000,
    info : {
      version: 0,
      protocolversion: 0,
      walletversion: 0,
      balance: 0,
      blocks: 0,
      timeoffset: 0,
      connections: 0,
      proxy: '',
      difficulty: {
        'proof-of-work': 0,
        'proof-of-stake': 0
      },
      testnet: null,
      keypoololdest: 0,
      keypoolsize: 0,
      paytxfee: 0,
      relayfee: 0,
      errors: '',
      network: '',
      reward: 0
    },
    stakingInfo: {
      weight: 0,
      netstakeweight: 0
    },
    supply: ""
  }
}
const builder = getStoreBuilder<RootState>().module('status', initialState())
const stateGetter = builder.state()

const baseURL = "http://localhost:3001/api/"

const statusModule = {
  get state() {
    return stateGetter()
  },

  setInfo: builder.commit(mutations.setInfo),
  setStakingInfo: builder.commit(mutations.setStakingInfo),
  setSupply: builder.commit(mutations.setSupply),

  getInfo: builder.dispatch(getInfo),
  getSyncStatus: builder.dispatch(getSyncStatus),
  getLastBlockHash: builder.dispatch(getLastBlockHash),
  getStakingInfo: builder.dispatch(getStakingInfo),
  getTotalSupply: builder.dispatch(getTotalSupply)
}

export default statusModule

declare type ActionContext = BareActionContext<StatusState, RootState>

async function getInfo(context: ActionContext): Promise<Info> {
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

async function getTotalSupply(context: ActionContext): Promise<String> {
  try {
    const res = await Axios.get(`${baseURL}statistics/total-supply?format=object`)
    return res.data
  } catch (e) {
    return e
  }
}
