import { AppConfig } from '@/types'

const prodURL = process.env.BASE_URL
const prodSocket = process.env.SOCKET_URL

export default {
  name: 'production',
  baseURL: prodURL,
  network: 'livenet',
  socketURL: prodSocket
} as AppConfig
