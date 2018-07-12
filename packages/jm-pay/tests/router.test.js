const $ = require('./service')

let service = null
let router = null
beforeAll(async () => {
  await $.onReady()
  service = $
  router = $.router()
  service.config.channels = ['wechat']
})

let payInfo = {
  channel: 'wechat',
  payer: '59648c53e366560a94e80bce',
  payee: '5996f970adec8b0df8bcd231',
  way: 'wechat',
  title: '测试',
  content: '测试付款',
  currency: 'cny',
  amount: 1,
  orderId: '123',
  memo: '测试哟个'
}

describe('router', async () => {
  test('pay create', async () => {
    let doc = await router.post('/pays', payInfo)
    console.log(doc)
    expect(doc).toBeTruthy()
  })
})
