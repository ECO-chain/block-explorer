import { AppConfig } from '@/types'

export default {
  name: 'production',
  baseURL: '/',
  network: 'livenet',
  socketURL: window.location.origin
} as AppConfig
