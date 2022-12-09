import history from '../../src/commands/history-cmd'
import * as helpers from '../../src/utils/helpers'
import { Release } from '../../src/types'

const runCommandMock = jest.fn()

jest.spyOn(helpers, 'runCommand').mockImplementation(runCommandMock);

beforeEach(() => {
  runCommandMock.mockClear()
})

describe('history-cmd', () => {
  test('returns expected helm history', async () => {
    const expectedCommand = 'helm history hello-world -o json --namespace=k8s-helm'
    const returnedStringHistory = '[{"revision":1,"updated":"2022-12-09T15:59:27.257192-05:00","status":"deployed","chart":"hello-world-0.1.0","app_version":"1.16.0","description":"Install complete"}]'
    const expectedHistory: Release[] = [
      {
        revision: 1,
        updated: '2022-12-09T15:59:27.257192-05:00',
        status: 'deployed',
        chart: 'hello-world-0.1.0',
        app_version: '1.16.0',
        description: 'Install complete'
      }
    ]
    const releaseName = 'hello-world'
    const namespace = 'k8s-helm'
    runCommandMock.mockImplementation(() => {
      return returnedStringHistory
    })
    const result = await history(releaseName, {
      namespace
    })
    expect(runCommandMock).toHaveBeenCalledWith(expectedCommand)
    expect(result).toEqual(expectedHistory)
  });

  test('returns expected helm history with max flag', async () => {
    const expectedCommand = 'helm history hello-world -o json --namespace=k8s-helm --max=10'
    const returnedStringHistory = '[{"revision":1,"updated":"2022-12-09T15:59:27.257192-05:00","status":"deployed","chart":"hello-world-0.1.0","app_version":"1.16.0","description":"Install complete"}]'
    const expectedHistory: Release[] = [
      {
        revision: 1,
        updated: '2022-12-09T15:59:27.257192-05:00',
        status: 'deployed',
        chart: 'hello-world-0.1.0',
        app_version: '1.16.0',
        description: 'Install complete'
      }
    ]
    const releaseName = 'hello-world'
    const namespace = 'k8s-helm'
    runCommandMock.mockImplementation(() => {
      return returnedStringHistory
    })
    const result = await history(releaseName, {
      namespace,
      max: 10
    })
    expect(runCommandMock).toHaveBeenCalledWith(expectedCommand)
    expect(result).toEqual(expectedHistory)
  });
});
