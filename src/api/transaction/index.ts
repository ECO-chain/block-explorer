import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import * as mutations from './mutations'
import { env } from '@/config'
import { TransactionState, Txs, Tx, SocketTx } from './type'

function initialState(): TransactionState {
  return {
    socketTx: [] as SocketTx[]
  }
}
const builder = getStoreBuilder<RootState>().module('txs', initialState())
const stateGetter = builder.state()

const txModule = {
  get state() {
    return stateGetter()
  },

  addNextSocketTx: builder.commit(mutations.addNextSocketTx),
  setLoading: builder.commit(mutations.setLoading),

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
