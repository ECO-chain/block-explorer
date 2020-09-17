import { AppConfig } from '@/types'

const prodURL = process.env.BASE_URL ? process.env.BASE_URL : '/'
const prodSocket = process.env.SOCKET_URL ? process.env.SOCKET_URL : '/'
const prodNetwork = process.env.NETWORK ? process.env.NETWORK : 'livenet'

export default {
  name: 'production',
  baseURL: prodURL,
  network: prodNetwork,
  socketURL: prodSocket
} as AppConfig
