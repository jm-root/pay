import o from './prepare'

let expect = chai.expect

let service = o.service

let pay = {
  orderId: 'test',
  channel: 'wechat',
  currency: 'cny',
  amount: 100,
  title: 'test',
  content: 'test'
}

let log = (err, doc) => {
  err && console.error(err.stack)
}

describe('service', () => {
  test('create pay', done => {
    service.pay
      .create(pay, function (err, doc) {
        log(err, doc)
        expect(err === null).to.be.ok
        done()
      })
  })

})
