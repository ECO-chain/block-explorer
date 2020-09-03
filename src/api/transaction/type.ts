import { TokenSummary } from '../ecrc20/type';

export interface TransactionState {
  socketTx: SocketTx[]
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
  // ECRC20 Transaction
  receipt?: TxReceipt[]
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

export interface SocketTx {
  isRBF: boolean
  txid: string
  valueOut: number
  vout: object[]
  loading: boolean
  time: number
}

export interface TxReceipt {
  blockHash: string
  blockNumber: number
  contractAddress: string
  cumulativeGasUsed: number
  excepted: string
  from: string
  gasUsed: number
  log: ReceiptLog[]
  to: string
  transactionHash: string
  transactionIndex: number
}

export interface ReceiptLog {
  address: string
  data: string
  topics: string[]
}

export interface TokenEvent {
  addressFrom: string
  addressTo: string
  amount: number
  contractInfo: TokenSummary
}
