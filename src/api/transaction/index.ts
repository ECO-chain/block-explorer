import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import { env } from '@/config'
import { TransactionState, Txs, Tx } from './type'

const initialState: TransactionState = {}
const builder = getStoreBuilder<RootState>().module('txs', initialState)
const stateGetter = builder.state()

const txModule = {
  get state() {
    return stateGetter
  },

  getBlockTransactions: builder.dispatch(getBlockTransactions),
  getAddressTransactions: builder.dispatch(getAddressTransactions),
  getTransactionByHash: builder.dispatch(getTransactionByHash)
}

export default txModule

declare type ActionContext = BareActionContext<TransactionState, RootState>

async function getBlockTransactions(context: ActionContext, hash: string): Promise<Txs> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/txs?block=${hash}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getAddressTransactions(context: ActionContext, payload: { hash: string, pageNum: number }): Promise<Txs> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/txs?address=${payload.hash}&pageNum=${payload.pageNum}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getTransactionByHash(context: ActionContext, hash: string): Promise<Tx> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/tx/${hash}`)
    return res.data
  } catch (e) {
    return e
  }
}
