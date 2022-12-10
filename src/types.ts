export interface GlobalFlags {
  namespace?: string
}

export type ListFlags = GlobalFlags & {
  allNamespaces?: boolean
}

export type InstallFlags = GlobalFlags & {
}

export type HistoryFlags = GlobalFlags & {
  max?: number
}

export type HelmStatus =
  'unknown' |
  'deployed' |
  'uninstalled' |
  'superseded' |
  'failed' |
  'uninstalling' |
  'pending-install' |
  'pending-upgrade' |
  'pending-rollback'

export interface Release {
  name?: string
  namespace?: string
  revision: number
  updated: string
  status: HelmStatus
  chart: string
  'app_version': string
  description?: string
}

export interface Repo {
  name: string
  url: string
}

export type RepoAddFlags = GlobalFlags & {
  username?: string
  password?: string
}

export type RepoListFlags = GlobalFlags & {
}
