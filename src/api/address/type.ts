export interface AddressState{}

export interface AddressSummary {
  addrStr: string
  balance: number
  balanceSat: number
  totalReceived: number
  totalReceivedSat: number
  totalSent: number
  totalSentSat: number
  unconfirmedBalance: number
  unconfirmedBalanceSat: number
  unconfirmedTxAppearances: number
  txAppearances: number
}
