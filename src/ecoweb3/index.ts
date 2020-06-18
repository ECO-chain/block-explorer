import ecoUtils from 'ecoweb3/src/utils'
import ecocCore from 'ecoccore-lib'
import { env } from '@/config'

export async function isEcoAddress(addr: string) {
  return await ecoUtils.isEcoAddress(addr)
}

export function getBitAddressFromContractAddress(addr: string) {
  try {
    const network = ecocCore.Networks.get(env!.network)
    const networkId = network.pubkeyhash.toString(16)
    const checksum = ecocCore.crypto.Hash.sha256sha256(new ecocCore.deps.Buffer(networkId + addr, 'hex'))
    const hexBitAddress = networkId + addr + checksum.toString('hex').slice(0, 8)

    return ecocCore.encoding.Base58.encode(new ecocCore.deps.Buffer(hexBitAddress, 'hex'))
  } catch (e) {
    return null
  }
}
