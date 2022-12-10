import { promisify } from 'util'
import childProcess from 'child_process'
import { GlobalFlags } from '../types'

const exec = promisify(childProcess.exec)

/**
 * A wrapper around the built-in exec that will throw an exception if anything is printed to stderr
 * @param command command to execute
 */
export const runCommand = async (command: string): Promise<string> => {
  const { stdout, stderr } = await exec(command)
  if (stderr !== '') {
    throw new Error(stderr)
  }
  return stdout
}

/**
 * e.g.
 * from:
 * {
 *    '--all-namespaces': false, // if false, flag is omitted
 *    '--namespace': 'my-namespace' // if empty string, flag is omitted
 * }
 * to:
 * '--all-namespaces --namespace=my-namespace'
 */
export const buildFlagsString = (flags: object): string => {
  return Object.entries(flags).map(([key, value]) => {
    if (typeof value === 'boolean' && value) return key
    if (typeof value === 'string' && value.length > 0) return `${key}=${value}`
    if (typeof value === 'number') return `${key}=${value}`
    return undefined
  }).filter(flag => flag !== undefined)
    .join(' ')
}

export const getAliasedGlobalFlags = ({ namespace = '' }: GlobalFlags = {}): { [key: string]: any } => ({
  '--namespace': namespace
})
