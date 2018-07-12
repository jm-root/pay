const o = require('./prepare')

let expect = chai.expect

let service = o.service
let router = o.router

service.config.ways = ['wechat']
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

let log = (err, doc) => {
  err && console.error(err.stack)
}

describe('router', () => {
  beforeAll(function (done) {
    service.onReady().then(done)
  })

  test('pay create', done => {
    router.post('/pays',
      payInfo,
      function (err, doc) {
        log(err, doc)
        expect(!err && !doc.err).to.be.ok
        done()
      })
  })
})
