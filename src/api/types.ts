export interface ExplorerState { }

// Blockchain info
export interface Status {
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
  testnet: boolean
  keypoololdest: number
  keypoolsize: number
  paytxfee: number
  relayfee: number
  errors: string
  network: string
  reward: number
}

export interface Block {
  height: number
  size: number
  hash: string
  time: number
  txlength: number
  poolInfo: Object
  isMainChain: boolean
  minedBy: string
}

// for Blocks
export interface Blocks {
  blocks: Block[]
  length: number
  pagination: Pagination
}

export interface BlockDetail {
  hash: string
  size: number
  height: number
  version: number
  merkleroot: string
  tx: string[]
  time: number
  nonce: number
  bits: string
  difficulty: number
  chainwork: string
  confirmations: number
  previousblockhash: string
  nextblockhash: string
  flags: string
  reward: number
  isMainChain: boolean
  minedBy: string
  poolInfo: Object
}

export interface Pagination {
  next: string
  prev: string
  currenTs: number
  current: string
  isToday: boolean
  more: boolean
  moreTs: number
}

// Blockchain info
export interface TotalSupply {
  supply: number
}

// Blockchain info
export interface StakingInfo {
  weight: number
  netstakeweight: number
}

// 7 days transaction chart
export interface Transactions {
  transaction: TransactionCount[]
}

export interface TransactionCount {
  date: string
  transaction_count: number
  block_count: number
}

export interface Txs {
  pagesTotal: number
  txs: Tx[]
}

export interface Tx {
  txid: string
  version: number
  locktime: number
  isEcrc20Transfer: boolean
  vin: TxValueIn[]
  vout: TxValueOut[]
  blockhash: string
  blockheight: number
  confirmations: number
  time: number
  blocktime: number
  valueOut: number
  size: number
  // In case of coin generating transaction
  isCoinBase?: boolean
  // In case of normal transaction / reward transaction
  valueIn?: number
  fees?: number
}

// for vin
export interface TxValueIn {
  // In case of coin generating transaction
  coinbase?: string
  // In case of normal transaction / reward transaction
  txid?: string
  vout?: number
  scriptSig?: {
    hex?: string
    asm?: string
  }
  addr?: string
  valueSat?: number
  value?: number
  doubleSpentTxID?: any
  // Mandatory
  n: number
  sequence: number

}

// for vout
export interface TxValueOut {
  value: string
  n: number
  scriptPubKey: ScriptPublicKey
  spentTxId: string | null
  spentIndex: number | null
  spentHeight: number |  null
}

export interface ScriptPublicKey {
  hex: string
  asm: string
  // In case of reward transaction / normal transaction
  addresses?: string[]
  type?: string
}
