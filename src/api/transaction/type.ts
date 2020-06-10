export interface TransactionState {}

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
