import { StatusState, Info, StakingInfo } from './type'

export function setInfo(state: StatusState, info: Info) {
  state.info = info
}

export function setStakingInfo(state: StatusState, stakingInfo: StakingInfo) {
  state.stakingInfo = stakingInfo
}

export function setSupply(state: StatusState, supply: string) {
  state.supply = supply
}
