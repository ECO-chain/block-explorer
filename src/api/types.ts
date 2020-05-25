export interface ExplorerState {}

export interface Status {
  version: Number
  protocolversion: Number,
  walletversion: Number,
  balance: Number,
  blocks: Number,
  timeoffset: Number,
  connections: Number,
  proxy: String,
  difficulty: {
    "proof-of-work": Number,
    "proof-of-stake": Number,
  }
  testnet: Boolean,
  keypoololdest: Number,
  keypoolsize: Number,
  paytxfee: Number,
  relayfee: Number,
  errors: String,
  network: String,
  reward: Number
}
