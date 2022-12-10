import { History, HistoryFlags } from '../types'
import { getAliasedGlobalFlags, runCommand, buildFlagsString } from '../utils/helpers'

const getAliasedHistoryFlags = ({ max }: HistoryFlags = {}): { [key: string]: any } => ({ '--max': max })

const buildHelmHistoryCmd = (releaseName: string, flags: HistoryFlags): string => {
  const allFlags = {
    ...getAliasedGlobalFlags(flags),
    ...getAliasedHistoryFlags(flags)
  }
  const flagsString = buildFlagsString(allFlags)
  return `helm history ${releaseName} -o json ${flagsString}`
}

const history = async (releaseName: string, flags: HistoryFlags = {}): Promise<History[]> => {
  const command = buildHelmHistoryCmd(releaseName, flags)
  const stdout = await runCommand(command)
  return JSON.parse(stdout)
}

export default history
