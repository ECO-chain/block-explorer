import local from './local'
import production from './production'

//TODO: Find other way to configure an environment

//@ts-ignore
const envName = process.env.NODE_ENV

export const env =
  envName === 'production'
    ? local
    : [production, local].find(env => env.name === envName)
