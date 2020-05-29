export interface StatusState {
  finalSupply: Number
}

export interface Status {
  version: Number
  protocolversion: Number
  walletversion: Number
  balance: Number
  blocks: Number
  timeoffset: Number
  connections: Number
  proxy: String
  difficulty: {
    "proof-of-work": Number
    "proof-of-stake": Number
  }
  testnet: Boolean
  keypoololdest: Number
  keypoolsize: Number
  paytxfee: Number
  relayfee: Number
  errors: String
  network: String
  reward: Number
}

export interface SyncStatus {
  status: String
  blockChainHeight: Number
  syncPercentage: Number
  height: Number
  error: any | null
  type: String
}

export interface LastBlockHash {
  syncTipHash: String
  lastblockhash: String
}

export interface StakingInfo {
  weight: Number
  netstakeweight: Number
}
