import { TransactionState, SocketTx } from './type'

export function addNextSocketTx(state: TransactionState, payload: SocketTx) {
  // first
  if (state.socketTx.length >= 10) {
    state.socketTx.pop()
  }
  state.socketTx.unshift(payload)
}
