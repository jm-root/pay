const error = require('jm-err')
const daorouter = require('jm-ms-daorouter')
const MS = require('jm-ms-core')

let ms = new MS()
let Err = error.Err
module.exports = function (service, opts = {}) {
  let t = function (doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      }
    }
    return doc
  }

  let listOpts = opts.list || {
    conditions: {},
    options: {
      sort: [{'crtime': -1}]
    },
    fields: {}
  }

  let getOpts = opts.get || {
    fields: {},
    populations: [
      {
        path: 'pay'
      }
    ]
  }

  let router = ms.router()
  service.onReady().then(() => {
    router
      .use(daorouter(service.refund, {
        list: listOpts,
        get: getOpts
      }))
  })
  return router
}
