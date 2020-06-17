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
  getBlocksByDateTime: builder.dispatch(getBlocksByDateTime),
  getBlockDetail: builder.dispatch(getBlockDetail),

  getAllBlocksByDateTime: builder.dispatch(getAllBlocksByDateTime),
  getBlocksWithLimit: builder.dispatch(getBlocksWithLimit)
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

async function getAllBlocksByDateTime(context: ActionContext, date: string): Promise<Blocks> {
  let res = await Axios.get(`${env!.baseURL}api/blocks?blockDate=${date}`)
  let entireBlocks: any[] = []
  entireBlocks = entireBlocks.concat(res.data.blocks)
  let next = res.data.pagination.next

  while (res.data.pagination.more) {
    let moreTimestamp = res.data.pagination.moreTs
    try {
      res = await Axios.get(`${env!.baseURL}api/blocks?blockDate=${date}&startTimestamp=${moreTimestamp}`)
    } catch (e) {
      if (e.response) {
        break
      }
    }

    entireBlocks = entireBlocks.concat(res.data.blocks)
  }

  res.data.blocks = entireBlocks
  res.data.length = res.data.blocks.length
  res.data.pagination.next = next
  return res.data
}

async function getBlocksWithLimit(context: ActionContext, number: number): Promise<Blocks> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/blocks?limit=${number}`)
    return res.data
  } catch (e) {
    return e
  }
}
