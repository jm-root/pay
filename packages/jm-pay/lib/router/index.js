const error = require('jm-err')
const MS = require('jm-ms-core')
const help = require('./help')
const pay = require('./pay')
const refund = require('./refund')

let ms = new MS()
let Err = error.Err
module.exports = function (opts = {}) {
  let service = this
  let t = function (doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      }
    }
    return doc
  }

  let router = ms.router()
  router
    .use(help(service))
    .use(function (opts, cb, next) {
      if (!service.ready) {
        return cb(null, t(Err.FA_NOTREADY, opts.lng))
      }
      next()
    })

  this.onReady().then(() => {
    router
      .use('/pays', pay(service, opts))
      .use('/refunds', refund(service, opts))
  })
  return router
}
