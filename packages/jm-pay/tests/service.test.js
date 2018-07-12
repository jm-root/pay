const $ = require('./service')

let pay = {
  orderId: 'test',
  channel: 'wechat',
  currency: 'cny',
  amount: 100,
  title: 'test',
  content: 'test'
}

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $
})

test('create pay', async () => {
  let doc = await service.pay.create(pay)
  console.log(doc)
  expect(doc).toBeTruthy()
})
