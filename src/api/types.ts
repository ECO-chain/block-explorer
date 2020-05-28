export interface ExplorerState { }

// Blockchain info
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

export interface Block {
  height: Number
  size: Number
  hash: String
  time: Number
  txlength: Number
  poolInfo: Object
  isMainChain: Boolean
  minedBy: String
}

// for Blocks
export interface Blocks {
  blocks: Block[]
  length: Number
  pagination: Pagination
}

export interface BlockDetail {
  hash: String
  size: Number
  height: Number
  version: Number
  merkleroot: String
  tx: String[]
  time: Number
  nonce: Number
  bits: String
  difficulty: Number
  chainwork: String
  confirmations: Number
  previousblockhash: String
  nextblockhash: String
  flags: String
  reward: Number
  isMainChain: Boolean
  minedBy: String
  poolInfo: Object
}

export interface Pagination {
  next: String
  prev: String
  currenTs: Number
  current: String
  isToday: Boolean
  more: Boolean
  moreTs: Number
}

// Blockchain info
export interface TotalSupply {
  supply: Number
}

// Blockchain info
export interface StakingInfo {
  weight: Number
  netstakeweight: Number
}

// 7 days transaction chart
export interface Transactions {
  transaction: TransactionCount[]
}

export interface TransactionCount {
  date: String
  transaction_count: Number
  block_count: Number
}

export interface Txs {
  pagesTotal: Number
  txs: Tx[]
}

export interface Tx {
  txid: String
  version: Number
  locktime: Number
  isEcrc20Transfer: Boolean
  vin: TxValueIn[]
  vout: TxValueOut[]
  blockhash: String
  blockheight: Number
  confirmations: Number
  time: Number
  blocktime: Number
  valueOut: Number
  size: Number
  // In case of coin generating transaction
  isCoinBase?: Boolean
  // In case of normal transaction / reward transaction
  valueIn?: Number
  fees?: Number
}

// for vin
export interface TxValueIn {
  // In case of coin generating transaction
  coinbase?: String
  // In case of normal transaction / reward transaction
  txid?: String
  vout?: Number
  scriptSig?: {
    hex?: String
    asm?: String
  }
  addr?: String
  valueSat?: Number
  value?: Number
  doubleSpentTxID?: any
  // Mandatory
  n: Number
  sequence: Number

}

// for vout
export interface TxValueOut {
  value: String
  n: Number
  scriptPubKey: ScriptPublicKey
  spentTxId: String | null
  spentIndex: Number | null
  spentHeight: Number |  null
}

export interface ScriptPublicKey {
  hex: String
  asm: String
  // In case of reward transaction / normal transaction
  addresses?: String[]
  type?: String
}
