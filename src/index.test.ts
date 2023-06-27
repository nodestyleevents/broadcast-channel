import { BroadcastChannel } from '.'

describe('BroadcastChannel', () => {
  let channel: BroadcastChannel<{
    foo: string,
  }>
  let channel2: BroadcastChannel<{
    foo: string,
  }>
  beforeEach(() => {
    channel = new BroadcastChannel('test')
    channel2 = new BroadcastChannel('test')
  })
  afterEach(async () => {
    await channel.close()
    await channel2.close()
  });
  it('should be able to send and receive messages', async () => {
    const message = { foo: 'bar' }
    const promise = new Promise((resolve) => {
      channel2.on('message', (ev) => {
        expect(ev).toEqual(message)
        resolve(void 0)
      })
    })
    await channel.postMessage(message)
    await promise
  });
  it('should be able to send and receive messages with send', async () => {
    const message = { foo: 'bar' }
    const promise = new Promise((resolve) => {
      channel2.on('message', (ev) => {
        expect(ev).toEqual(message)
        resolve(void 0)
      })
    })
    await channel.send(message)
    await promise
  })
  it('should be able to close the channel', async () => {
    const message = { foo: 'bar' }
    const promise = new Promise((resolve) => {
      const fun = jest.fn()
      channel.on('message', fun)
      channel2.on('message', fun)
      setTimeout(() => {
        expect(fun).toHaveBeenCalledTimes(0)
        resolve(void 0)
      }, 100);
    })
    await channel.close()
    await channel2.send(message)
    await promise
  });
  afterAll(() => {
    eval(`require('process').exit()`)
  }, 1000)
});
