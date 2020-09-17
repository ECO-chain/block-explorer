import { AppConfig } from '@/types'

const prodURL = process.env.VUE_APP_BASE_URL? process.env.VUE_APP_BASE_URL : '/'
const prodSocket = process.env.VUE_APP_SOCKET_URL? process.env.VUE_APP_SOCKET_URL : '/'
const prodNetwork = process.env.VUE_APP_NETWORK? process.env.VUE_APP_NETWORK : 'livenet'

export default {
  name: 'production',
  baseURL: prodURL,
  network: prodNetwork,
  socketURL: prodSocket
} as AppConfig
