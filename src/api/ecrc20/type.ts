export interface ECRC20State {}

export interface TokenItems {
  count: number,
  items: Token[]
}

export interface Token {
  // for table
  description?: string
  count_holders?: number
  // for search result
  _id?: string
  __v?: number
  // mandatory
  tx_hash: string
  vout_idx: number
  created_at: string
  updated_at: string
  block_height: number
  contract_address: string
  contract_address_base: string
  decimals: string
  exception: boolean
  name: string
  symbol: string
  total_supply: string
  version: string
}

export interface TokenSummary {
  contract_address: string
  total_supply: string
  decimals: string
  name: string
  symbol: string
  version: string
  transfers_count: number
  holders_count: number
}

export interface TokenTransfers {
  limit: number
  offset: number
  count: number
  items: TokenTransfer[]
}

export interface TokenTransfer {
  contract_address: string
  tx_hash: string
  tx_time: number
  from: string
  from_eth: string
  to: string
  to_eth: string
  value: string
}

export interface TokenHolders {
  limit: number
  offset: number
  count: number
  items: TokenHolder[]
}

export interface TokenHolder {
  contract_address: string
  address: string
  address_eth: string
  amount: string
}

export interface TokenTracker {
  amount: string
  address: string
  address_eth: string
  rank?: number
  contract: Token
}
