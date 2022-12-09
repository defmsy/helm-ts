import { GlobalFlags } from '../types'
import install from './install-cmd'
import list from './list-cmd'
import repo from './repo-cmd'

export const getAliasedGlobalFlags = ({
  namespace = ''
}: GlobalFlags = {}): { [key: string]: any } => ({
  '--namespace': namespace
})

export default {
  install,
  list,
  repo
}
