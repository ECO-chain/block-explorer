import { BlockState, SocketBlock } from './type'

export function setSocketBlock(state: BlockState, socketBlock: SocketBlock[]) {
  state.socketBlock = socketBlock
}

export function addNewSocketBlock(state: BlockState, payload: SocketBlock) {
  state.socketBlock.pop()
  state.socketBlock.unshift(payload)
}

export function setLoading(state: BlockState, payload: { block: SocketBlock, state: boolean }) {
  const sIndex = state.socketBlock.indexOf(payload.block)

  state.socketBlock[sIndex].loading = payload.state
}
