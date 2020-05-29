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
  txStats: TxStats[]
}

export interface FeeStat {
  feeStats: Fee[]
}

export interface OutputStat {
  outputStats: Outputs[]
}

export interface DifficultyStats {
  difficultyStats: Difficulty[]
}

export interface StakeStats {
  stakeStats: Stake[]
}

export interface TxStats {
  date: String
  transaction_count: Number
  block_count: Number
}

export interface Fee {
  date: String
  fee: Number
}

export interface Outputs {
  date: String
  sum: String
}

export interface Difficulty {
  date: String
  sum: Number
}

export interface Stake {
  date: String
  sum: Number
}
