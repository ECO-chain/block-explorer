export interface StatusState {
  finalSupply: number
  finalSupplyThemis: number
  info: Info
  stakingInfo: StakingInfo
  supply: string
  coinBurned: number
}

export interface Info {
  version: number
  protocolversion: number
  walletversion: number
  balance: number
  blocks: number
  timeoffset: number
  connections: number
  proxy: string
  difficulty: {
    "proof-of-work": number
    "proof-of-stake": number
  }
  testnet: boolean | null
  keypoololdest: number
  keypoolsize: number
  paytxfee: number
  relayfee: number
  errors: string
  network: string
  reward: number
}

export interface SyncStatus {
  status: string
  blockChainHeight: number
  syncPercentage: number
  height: number
  error: any | null
  type: string
}

export interface LastBlockHash {
  syncTipHash: string
  lastblockhash: string
}

export interface StakingInfo {
  weight: number
  netstakeweight: number
}
