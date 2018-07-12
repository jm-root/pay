import error from 'jm-err'
import daorouter from 'jm-ms-daorouter'
import MS from 'jm-ms-core'

let ms = new MS()
let Err = error.Err
export default function (service, opts = {}) {
  let t = function (doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      }
    }
    return doc
  }

  var listOpts = opts.list || {
    conditions: {},
    options: {
      sort: [{'crtime': -1}]
    },
    fields: {}
  }

  var getOpts = opts.get || {
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
