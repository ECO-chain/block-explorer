import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import { ExplorerState, Status } from './types'
import Axios from 'axios'

const initialState: ExplorerState = {}
const builder = getStoreBuilder<RootState>().module('explorer', initialState)
const stateGetter = builder.state()

const baseURL = "https://explorer.ecoc.io/api/"

const explorerModule = {
  get state() {
    return stateGetter()
  },

  getStatus: builder.dispatch(getStatus)
}

export default explorerModule

declare type ActionContext = BareActionContext<ExplorerState, RootState>

async function getStatus(context: ActionContext): Promise<Status> {
  try {
    const res = await Axios.get(`${baseURL}status?=getInfo`)
    return res.data["info"]
  } catch (e) {
    return e
  }
}

