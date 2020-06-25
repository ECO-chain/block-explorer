import ecoUtils from 'ecoweb3/src/utils'
import ecocCore from 'ecoccore-lib'
import { env } from '@/config'
import { lookupOpcode } from './utils'
import { TokenSummary } from '@/api/ecrc20/type'
import ecrc20Module from '@/api/ecrc20/index'

const CONTRACT_CALL = 194;
const CONTRACT_CREATE = 193;

const TOPICS_HASH = 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

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

  export const getContractOpcodesString = function (hex: any) {
    let contractCode = new ecocCore.deps.Buffer(hex, 'hex')
    let ops = [];

    for (let index = 0; index < contractCode.length; index++) {
      let currentOp = lookupOpcode(contractCode[index], true);
      // record the program counter
      currentOp.pc = index;
      ops.push(currentOp);
      // handle PUSH inline data
      if (currentOp.name.slice(0, 4) === 'PUSH') {
        // load inline data
        let pushDataLength = contractCode[index] - 0x5f;
        let pushData = contractCode.slice(index + 1, index + pushDataLength + 1);

        currentOp.pushData = pushData;

        // skip read of inline data
        index += pushDataLength;
      }
    }
    let opcodesStr = '';

    for (let i = 0; i < ops.length; i++) {
      if ((ops[i]['pushData'])) {
        opcodesStr += (' ' + ops[i]['name'] + ((ops[i]['pushData']) ? (' 0x' + ops[i]['pushData']!.toString('hex')) : ''));
      } else {
        opcodesStr += (' ' + ops[i]['name']);
      }
    }
    return opcodesStr;
  }

  export const parseTokenTxEvent = async function (logItem: any) {
    try {
      let tokenData = await ecrc20Module.getTokenSummary(logItem.address)

      if (tokenData && tokenData.contract_address) {
        let addressFrom = logItem.topics[1]
        let addressTo = logItem.topics[2]
        let amount = parseInt(logItem.data, 16)

        const tokenEvent = {
          addressFrom: await getBitAddressFromContractAddress(addressFrom.slice(addressFrom.length - 40, addressFrom.length)),
          addressTo: await getBitAddressFromContractAddress(addressTo.slice(addressTo.length - 40, addressTo.length)),
          amount: amount,
          contractInfo: tokenData
        };

        return tokenEvent
      }
    } catch (e) {
      return e
    }
  }

  export const getContractByteCode = async function (hex: string) {
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
