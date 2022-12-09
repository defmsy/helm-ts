import { Repo, RepoAddFlags, RepoListFlags } from '../types'
import { getAliasedGlobalFlags } from './helm-cmd'
import { runCommand, buildFlagsString } from '../utils/helpers'

const getAliasedRepoAddFlags = ({
  username = '',
  password = ''
}: RepoAddFlags = {}): { [key: string]: any } => ({
  '--username': username,
  '--password': password
})

const buildHelmRepoAddCmd = (name: string, url: string, flags: RepoAddFlags): string => {
  const allFlags = {
    ...getAliasedGlobalFlags(flags),
    ...getAliasedRepoAddFlags(flags)
  }
  const flagsString = buildFlagsString(allFlags)
  return `helm repo add ${name} ${url} ${flagsString}`
}

const buildHelmRepoListCmd = (flags: RepoListFlags): string => {
  const allFlags = {
    ...getAliasedGlobalFlags(flags)
  }
  const flagsString = buildFlagsString(allFlags)
  return `helm repo list -o json ${flagsString}`
}

const add = async (name: string, url: string, flags: RepoAddFlags = {}): Promise<string> => {
  const command = buildHelmRepoAddCmd(name, url, flags)
  return await runCommand(command)
}

const list = async (flags: RepoListFlags = {}): Promise<Repo[]> => {
  const command = buildHelmRepoListCmd(flags)
  const stdout = await runCommand(command)
  return JSON.parse(stdout)
}

export default {
  add,
  list
}
