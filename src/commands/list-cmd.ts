import { Release, ListFlags } from '../types'
import { getAliasedGlobalFlags, runCommand, buildFlagsString } from '../utils/helpers'

const getAliasedListFlags = ({
  allNamespaces = false
}: ListFlags = {}): { [key: string]: any } => ({
  '--all-namespaces': allNamespaces
})

const buildHelmListCmd = (flags: ListFlags): string => {
  const allFlags = {
    ...getAliasedGlobalFlags(flags),
    ...getAliasedListFlags(flags)
  }
  const flagsString = buildFlagsString(allFlags)
  return `helm list -o json ${flagsString}`
}

const list = async (flags: ListFlags = {}): Promise<Release[]> => {
  const command = buildHelmListCmd(flags)
  const stdout = await runCommand(command)
  return JSON.parse(stdout)
}

export default list
