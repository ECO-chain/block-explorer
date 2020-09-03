import { StatusState } from '../api/status/type'
import { StatisticsState } from '../api/statistics/type'
import { ECRC20State } from '../api/ecrc20/type'
import { BlockState } from '@/api/blocks/type'
import { AddressState } from '@/api/address/type'
import { TransactionState } from '@/api/transaction/type'
import { CommonState } from './common/type'

export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  STATUS = 'status',
  BLOCK = 'block',
  TX = 'tx',
  MARKETS = 'martkets_info',
  INFO = 'info',
  SYNC = 'sync',
  ADDRESSTX = 'ecocd/addresstxid'
}

export interface RootState {
  status: StatusState
  statistics: StatisticsState
  ecrc20: ECRC20State
  block: BlockState
  address: AddressState
  tx: TransactionState,
  common: CommonState
}
