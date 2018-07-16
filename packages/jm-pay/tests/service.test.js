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
  pay.id = doc.id
  console.log(doc)
  expect(doc).toBeTruthy()
})

test('update pay', async () => {
  pay.status = 2
  let doc = await service.pay.update({_id: pay.id}, pay)
  console.log(doc)
  expect(doc).toBeTruthy()
})

test('findOneAndUpdate pay', async () => {
  pay.status = 3
  let doc = await service.pay.findOneAndUpdate({_id: pay.id}, pay)
  console.log(doc)
  expect(doc).toBeTruthy()
})
