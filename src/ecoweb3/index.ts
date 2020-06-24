import ecoUtils from 'ecoweb3/src/utils'
import ecocCore from 'ecoccore-lib'
import { env } from '@/config'

const CONTRACT_CALL = 194;
const CONTRACT_CREATE = 193;

namespace ecoweb3 {
  /**  somehow eslint doesn't let normal function declaration pass, so we have to do this way i think
   or maybe we have to fixes it if possible **/
  export const isEcoAddress = async function (addr: string) {
    return await ecoUtils.isEcoAddress(addr)
  }

  export const getBitAddressFromContractAddress = function (addr: string) {
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
}

function getContractByteCode(hex: string) {
  try {
    let script = ecocCore.Script(hex)

    if (script.chunks && script.chunks.length) {
      for (let k = 0; k < script.chunks.length; k++) {
        if (script.chunks[k] &&
          script.chunks[k]['opcodenum'] &&
          [CONTRACT_CALL, CONTRACT_CREATE].indexOf(script.chunks[k]['opcodenum']) !== -1) {
          switch (script.chunks[k]['opcodenum']) {
            case CONTRACT_CALL:
              return {
                code: script.chunks[k - 2]['buf'].toString('hex'),
                type: 'Call'
              };
            case CONTRACT_CREATE:
              return {
                code: script.chunks[k - 1]['buf'].toString('hex'),
                type: 'Create'
              }
          }
        }
      }
    }
  } catch (e) {
    return e
  }
  return null
}

export default ecoweb3
