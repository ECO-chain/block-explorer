export interface BlockState {
  socketBlock: SocketBlock[]
}

export interface Blocks {
  blocks: Block[]
  length: number
  pagination: Pagination
}

export interface Block {
  height: number
  size: number
  hash: string
  time: number
  txlength: number
  poolInfo: object
  isMainChain: boolean
  minedBy: string
}

export interface SocketBlock {
  block: BlockDetail
  loading: boolean
}

export interface Pagination {
  next: string
  prev: string
  currentTs: number
  current: string
  isToday: boolean
  more: boolean
  //moreTs will disappear when last blocks interval of a day is called
  moreTs?: number
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
  // latest block doesn't have this
  nextblockhash?: string
  flags: string
  reward: number
  isMainChain: boolean
  minedBy: string
  poolInfo: object
}

export interface BlockHash {
  blockHash: string
}
