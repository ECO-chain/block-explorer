import { StatusState } from '../api/status/type'
import { StatisticsState } from '../api/statistics/type'
import { ECRC20State } from '../api/ecrc20/type'

export interface RootState {
  status: StatusState
  statistics: StatisticsState
  ecrc20: ECRC20State
}
