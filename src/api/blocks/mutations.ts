import { BlockState, SocketBlock } from './type'

export function setSocketBlock(state: BlockState, socketBlock: SocketBlock[]) {
  state.socketBlock = socketBlock
}

export function addNewSocketBlock(state: BlockState, payload: SocketBlock) {
  state.socketBlock.pop()
  state.socketBlock.unshift(payload)

  const sIndex = state.socketBlock.indexOf(payload)

  setTimeout(() => {
    state.socketBlock[sIndex].loading = false
  }, 2000)
}
