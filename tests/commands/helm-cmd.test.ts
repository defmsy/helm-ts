/* eslint-disable no-undef */
import { getAliasedGlobalFlags } from '../../src/utils/helpers'

describe('helm-cmd', () => {
  it('returns default aliased global flags', () => {
    const defaultGlobalFlags = {
      '--namespace': '',
    };
    expect(getAliasedGlobalFlags()).toEqual(defaultGlobalFlags);
  });
});
