import { TransactionState, SocketTx } from './type'

export function addNextSocketTx(state: TransactionState, payload: SocketTx) {
  // first
  if (state.socketTx.length >= 10) {
    state.socketTx.pop()
  }
  state.socketTx.unshift(payload)
}

export function setLoading(state: TransactionState, payload: {tx: SocketTx, state: boolean}) {
  const sIndex = state.socketTx.indexOf(payload.tx)

  state.socketTx[sIndex].loading = payload.state
}
