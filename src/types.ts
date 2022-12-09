export interface GlobalFlags {
  namespace?: string
}

export type ListFlags = GlobalFlags & {
  allNamespaces?: boolean
}

export type InstallFlags = GlobalFlags & {
}

export interface Release {
  name: string
  namespace: string
  revision: string
  updated: string
  status:
  'unknown' |
  'deployed' |
  'uninstalled' |
  'superseded' |
  'failed' |
  'uninstalling' |
  'pending-install' |
  'pending-upgrade' |
  'pending-rollback'
  chart: string
  'app_version': string
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
