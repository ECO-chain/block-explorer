export interface StatisticsState {}

export interface Total {
  n_blocks_mined: Number
  time_between_blocks: Number
  mined_currency_amount: Number
  transaction_fees: Number
  number_of_transactions: Number
  outputs_volume: Number
  difficulty: Number
  stake: Number
}

export interface TransactionStats {
  date: String
  transaction_count: Number
  block_count: Number
}

export interface FeeStat {
  date: String
  fee: Number
}

export interface OutputStat {
  date: String
  sum: String
}

export interface DifficultyStats {
  date: String
  sum: Number
}

export interface StakeStats {
  date: String
  sum: Number
}

export interface SupplyStats {
  date: String
  sum: String
}

export interface BalanceIntervals {
  max: Number
  min: Number
  count: Number
  sum: Number
}

export interface RichList {
  address: String
  blocks_mined: Number
  balance: Number
}

// export interface TxStats {
//   date: String
//   transaction_count: Number
//   block_count: Number
// }

// export interface Fee {
//   date: String
//   fee: Number
// }

// export interface Outputs {
//   date: String
//   sum: String
// }

// export interface Difficulty {
//   date: String
//   sum: Number
// }

// export interface Stake {
//   date: String
//   sum: Number
// }

// export interface Supply {
//   date: String
//   sum: String
// }

// export interface BalanceIntervals {
//   max: Number
//   min: Number
//   count: Number
//   sum: Number
// }

// export interface RichAddress {
//   address: String
//   blocks_mined: Number
//   balance: Number
// }
