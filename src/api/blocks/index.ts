import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import { env } from '@/config'
import * as mutations from './mutations'
import { Blocks, Block, BlockDetail, BlockState, BlockHash, SocketBlock } from './type'

function initialState(): BlockState {
  return {
    socketBlock: []
  }
}
const builder = getStoreBuilder<RootState>().module('block', initialState())
const stateGetter = builder.state()

const blocksModule = {
  get state() {
    return stateGetter()
  },

  setSocketBlock: builder.commit(mutations.setSocketBlock),
  addNewSocketBlock: builder.commit(mutations.addNewSocketBlock),
  setLoading: builder.commit(mutations.setLoading),

  getBlocksList: builder.dispatch(getBlocksList),
  getBlocksByDateTime: builder.dispatch(getBlocksByDateTime),
  getBlockDetail: builder.dispatch(getBlockDetail),

  getBlocksWithLimit: builder.dispatch(getBlocksWithLimit),
  getBlockHashByIndex: builder.dispatch(getBlockHashByIndex),

  getInitialSocketBlock: builder.dispatch(getInitialSocketBlock)
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

async function getBlocksByDateTime(context: ActionContext, payload: { date: string, time?: number, cancel?: boolean }): Promise<Blocks> {
  const CancelToken = Axios.CancelToken
  const source = CancelToken.source()

  if ('cancel' in payload && payload.cancel) {
    source.cancel('Blocks requesting cancelled')
  }

  try {
    if ('time' in payload) {
      const res = await Axios.get(`${env!.baseURL}api/blocks?blockDate=${payload.date}&startTimestamp=${payload.time}`, {
        cancelToken: source.token
      })
      return res.data
    } else {
      const res = await Axios.get(`${env!.baseURL}api/blocks?blockDate=${payload.date}`, {
        cancelToken: source.token
      })
      return res.data
    }
  } catch (e) {
    if (Axios.isCancel(e)) {
      return e
    }
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

async function getBlocksWithLimit(context: ActionContext, number: number): Promise<Blocks> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/blocks?limit=${number}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getBlockHashByIndex(context: ActionContext, index: number): Promise<BlockHash> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/block-index/${index}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getInitialSocketBlock() {
  try {
    const socketBlock = [] as SocketBlock[]

    const res = await Axios.get(`${env!.baseURL}api/blocks`)

    // Only first 10 latest blocks
    const blocks = res.data.blocks.slice(0, 10)

    blocks.forEach(async (block: Block) => {
      let bDetail = await Axios.get(`${env!.baseURL}api/block/${block.hash}`)
      const loading = false
      socketBlock.push({ block: bDetail.data as BlockDetail, loading } as SocketBlock)
    })

    blocksModule.setSocketBlock(socketBlock)
  } catch (e) {
    return e
  }
}
