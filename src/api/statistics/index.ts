import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import { StatisticsState, Total, TransactionStats, FeeStat, OutputStat, DifficultyStats, StakeStats } from './type'
import { env } from '@/config'

const initialState: StatisticsState = {}
const builder = getStoreBuilder<RootState>().module('statistics', initialState)
const stateGetter = builder.state()

const statisticsModule = {
  get state() {
    return stateGetter()
  },

  getTotalStats: builder.dispatch(getTotalStats),
  getTransactionStats: builder.dispatch(getTransactionStats),
  getFeeStats: builder.dispatch(getFeeStats),
  getOutputStats: builder.dispatch(getOutputStats),
  getDifficultyStats: builder.dispatch(getDifficultyStats),
  getStakeStats: builder.dispatch(getStakeStats)
}

export default statisticsModule

declare type ActionContext = BareActionContext<StatisticsState, RootState>

async function getTotalStats(context: ActionContext): Promise<Total> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/total`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getTransactionStats(context: ActionContext, days: String = '30'): Promise<TransactionStats> {
  // Default is latest transactions 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/transactions?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getFeeStats(context: ActionContext, days: String = '30'): Promise<FeeStat> {
  // Default is latest fees in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/fees?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getOutputStats(context: ActionContext, days: String = '30'): Promise<OutputStat> {
  // Default is latest outputs in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/outputs?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getDifficultyStats(context: ActionContext, days: String = '30'): Promise<DifficultyStats> {
  // Default is latest difficulty in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/difficulty?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getStakeStats(context: ActionContext, days: String = '30'): Promise<StakeStats> {
  // Default is latest staking in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/stake?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}
