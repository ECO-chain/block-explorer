import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import { env } from '@/config'
import { Blocks, BlockDetail, BlockState } from './type'

const initialState: BlockState = {}
const builder = getStoreBuilder<RootState>().module('block', initialState)
const stateGetter = builder.state()

const blocksModule = {
  get state() {
    return stateGetter
  },

  getBlocksList: builder.dispatch(getBlocksList),
  getBlocksByDateTime: builder.dispatch(getBlockDetail),
  getBlockDetail: builder.dispatch(getBlockDetail)
}

export default blocksModule

declare type ActionContext = BareActionContext<BlockState, RootState>

async function getBlocksList(context: ActionContext): Promise<Blocks> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/blocks`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getBlocksByDateTime(context: ActionContext, payload: {date: string, time?: number}): Promise<Blocks> {
  try {
    if ('time' in payload) {
      const res = await Axios.get(`${env!.baseURL}api/blocks?blockDate=${payload.date}&startTimestamp=${payload.time}`)
      return res.data
    }
    const res = await Axios.get(`${env!.baseURL}api/blocks?blockDate=${payload.date}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getBlockDetail(context: ActionContext, hash: string): Promise<BlockDetail> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/block/${hash}`)
    return res.data
  } catch (e) {
    return e
  }
}
