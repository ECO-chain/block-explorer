import local from './local'
import production from './production'

//TODO: Find other way to configure an environment

//@ts-ignore
const envName = process.argv[2]

export const env =
  envName === undefined
    ? local
    : [production, local].find(env => env.name === envName)
