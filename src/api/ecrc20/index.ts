import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import { env } from '@/config'
import { ECRC20State, TokenItems, TokenSummary, TokenTransfers, TokenHolders, TokenTracker } from './type'

const initialState: ECRC20State = {}
const builder = getStoreBuilder<RootState>().module('ecrc20', initialState)
const stateGetter = builder.state()

const ecrc20Module = {
  get state() {
    return stateGetter
  },

  getAllTokens: builder.dispatch(getAllTokens),
  getTokenBySearch: builder.dispatch(getTokenBySearch),
  getTokenSummary: builder.dispatch(getTokenSummary),
  getTokenTransfers: builder.dispatch(getTokenTransfers),
  getTokenHolders: builder.dispatch(getTokenHolders),
  getTokenTracker: builder.dispatch(getTokenTracker)
}

export default ecrc20Module

declare type ActionContext = BareActionContext<ECRC20State, RootState>

async function getAllTokens(context: ActionContext): Promise<TokenItems> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/tokens`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getTokenBySearch(context: ActionContext, keyword: string): Promise<TokenItems> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/ecrc20/search?query=${keyword}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getTokenSummary(context: ActionContext, contractAddr: string): Promise<TokenSummary> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/ecrc20/${contractAddr}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getTokenTransfers(context: ActionContext, payload: {contractAddr: string, limit: number, offset: number}): Promise<TokenTransfers> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/ecrc20/${payload.contractAddr}/transfers?limit=${payload.limit}&offset=${payload.offset}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getTokenHolders(context: ActionContext, payload: {contractAddr: string, limit: number, offset: number}): Promise<TokenHolders> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/ecrc20/${payload.contractAddr}/balances?limit=${payload.limit}&offset=${payload.offset}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getTokenTracker(context: ActionContext, userAddr: string): Promise<TokenTracker> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/ecrc20/balances?balanceAddress=${userAddr}`)
    return res.data
  } catch (e) {
    return e
  }
}
