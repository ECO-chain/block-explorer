import { StatusState } from '../api/status/type'
import { StatisticsState } from '../api/statistics/type'

export interface RootState {
  status: StatusState
  statistics: StatisticsState
}
