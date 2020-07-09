export function toAddressesPercent(addrCount: number, allAddr: number[]) {
  if ((!!addrCount && !!allAddr) === false) { return 0 }
  const totalAddr = allAddr.reduce((pval, cval) => pval + cval, 0)
  const addrPercent = addrCount / totalAddr * 100

  return addrPercent
}

export function toAddressesRelativePercent(addrCount: number, allAddr: number[]) {
  if ((!!addrCount && !!allAddr) === false) { return 0 }
  const maxAddr = Math.max(...allAddr)
  const addrRPercent = addrCount / maxAddr * 100

  return addrRPercent
}

export function toCoinsPercent(coins: number, allCoins: number[]) {
  if ((!!coins && !!allCoins) === false) { return 0 }
  const totalCoins = allCoins.reduce((pval, cval) => pval + cval, 0)
  const coinsPercent = coins / totalCoins * 100

  return coinsPercent
}

export function toCoinsRelativePercent(coins: number, allCoins: number[]) {
  if ((!!coins && !!allCoins) === false) { return 0 }
  const maxCoins = Math.max(...allCoins)
  const coinsRPercent = coins / maxCoins * 100

  return coinsRPercent
}
