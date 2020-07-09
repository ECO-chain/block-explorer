import { getStoreBuilder, BareActionContext } from 'vuex-typex'
import { RootState } from '@/store/types'
import Axios from 'axios'
import { StatisticsState, Total, TransactionStats, FeeStat, OutputStat, DifficultyStats, StakeStats, SupplyStats, BalanceIntervals, RichList, BalanceIntervalsTable } from './type'
import { env } from '@/config'
import { toAddressesPercent, toAddressesRelativePercent, toCoinsPercent, toCoinsRelativePercent } from '@/api/utils'

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
  getStakeStats: builder.dispatch(getStakeStats),
  getSupplyStats: builder.dispatch(getSupplyStats),
  getBalanceIntervals: builder.dispatch(getBalanceIntervals),
  getRichestList: builder.dispatch(getRichestList),
  getBalanceIntervalsTable: builder.dispatch(getBalanceIntervalsTable)
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

async function getTransactionStats(context: ActionContext, days: string = '30'): Promise<TransactionStats[]> {
  // Default is latest transactions 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/transactions?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getFeeStats(context: ActionContext, days: string = '30'): Promise<FeeStat[]> {
  // Default is latest fees in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/fees?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getOutputStats(context: ActionContext, days: string = '30'): Promise<OutputStat[]> {
  // Default is latest outputs in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/outputs?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getDifficultyStats(context: ActionContext, days: string = '30'): Promise<DifficultyStats[]> {
  // Default is latest difficulty in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/difficulty?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getStakeStats(context: ActionContext, days: string = '30'): Promise<StakeStats[]> {
  // Default is latest staking in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/stake?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getSupplyStats(context: ActionContext, days: string = '30'): Promise<SupplyStats[]> {
  // Default is latest supply in 30 days
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/supply?days=${days}`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getBalanceIntervals(): Promise<BalanceIntervals[]> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/balance-intervals`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getRichestList(context: ActionContext): Promise<RichList[]> {
  try {
    const res = await Axios.get(`${env!.baseURL}api/statistics/richest-addresses-list`)
    return res.data
  } catch (e) {
    return e
  }
}

async function getBalanceIntervalsTable(context: ActionContext) {
  try {
    const res = await getBalanceIntervals()
    const addrCountArr = res.map((bi) => bi.count)
    const coinsArr = res.map((bi) => bi.sum)

    let biTable = res.map((val) => {
      return {
        balance: `${val.min.toLocaleString()} - ${val.max.toLocaleString()}`,
        addresses: val.count.toLocaleString(),
        percentAddresses: toAddressesPercent(val.count, addrCountArr),
        percentAddressesTotal: toAddressesRelativePercent(val.count, addrCountArr),
        coins: val.sum.toLocaleString(),
        percentCoins: toCoinsPercent(val.sum, coinsArr),
        percentCoinsTotal: toCoinsRelativePercent(val.sum, coinsArr),
      }
    })

    return biTable
  }
  catch (e) {
    return e
  }
}
