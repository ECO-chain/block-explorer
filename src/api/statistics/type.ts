export interface StatisticsState {}

export interface Total {
  n_blocks_mined: number
  time_between_blocks: number
  mined_currency_amount: number
  transaction_fees: number
  number_of_transactions: number
  outputs_volume: number
  difficulty: number
  stake: number
}

export interface TransactionStats {
  date: string
  transaction_count: number
  block_count: number
}

export interface FeeStat {
  date: string
  fee: number
}

export interface OutputStat {
  date: string
  sum: string
}

export interface DifficultyStats {
  date: string
  sum: number
}

export interface StakeStats {
  date: string
  sum: number
}

export interface SupplyStats {
  date: string
  sum: string
}

export interface BalanceIntervals {
  max: number
  min: number
  count: number
  sum: number
}

export interface RichList {
  address: string
  blocks_mined: number
  balance: number
}

// For display a table
export interface BalanceIntervalsTable {
  balance: string
  addresses: number
  percentAddresses: number
  percentAddressesTotal: number
  coins: number
  percentCoins: number
  percentCoinsTotal: number
}

