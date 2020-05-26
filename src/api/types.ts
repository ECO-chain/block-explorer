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

export interface Block {
  height: Number,
  size: Number,
  hash: String,
  time: Number,
  txlength: Number,
  poolInfo: Object,
  isMainChain: Boolean,
  minedBy: String
}

export interface Blocks {
  blocks: Block[],
  length: Number,
  pagination: Pagination
}

export interface Pagination {
  next: String,
  prev: String,
  currenTs: Number,
  current: String,
  isToday: Boolean,
  more: Boolean,
  moreTs: Number
}
