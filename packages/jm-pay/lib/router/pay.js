const _ = require('lodash')
const validator = require('validator')
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
    fields: {},
    populations: [
      {
        path: 'payer',
        select: 'nick'
      },
      {
        path: 'payee',
        select: 'nick'
      }
    ]
  }

  let getOpts = opts.get || {
    fields: {},
    populations: [
      {
        path: 'payer',
        select: 'nick'
      },
      {
        path: 'payee',
        select: 'nick'
      }
    ]
  }

  let router = ms.router()
  service.onReady().then(() => {
    router
      .add('/', 'get', function (opts, cb, next) {
        if (opts.headers && opts.headers.acl_user) {
          opts.data.payer = opts.headers.acl_user
        }
        next()
      })
      .add('/', 'post', function (opts, cb, next) {
        let data = opts.data
        opts.ip && (data.ip = opts.ip)
        // post校验
        if (opts.headers && opts.headers.acl_user) {
          data.payer = opts.headers.acl_user
        }
        // 检查bill
        if (typeof data.bill === 'string') {
          try {
            data.bill = JSON.parse(data.bill)
          } catch (e) {
          }
        }
        data.bill || (data.bill = {})
        if (!_.isPlainObject(data.bill)) {
          return cb(null, Err.FA_PARAMS)
        }
        // 检查附加参数
        if (typeof data.ext === 'string') {
          try {
            data.ext = JSON.parse(data.ext)
          } catch (e) {
          }
        }
        data.ext || (data.ext = {})
        if (!_.isPlainObject(data.ext)) {
          return cb(null, Err.FA_PARAMS)
        }

        if (data.successURL && !validator.isURL(data.successURL)) {
          return cb(null, Err.FA_PARAMS)
        }

        if (isNaN(data.amount)) {
          return cb(null, Err.FA_PARAMS)
        }
        if (data.amount < 0) {
          return cb(null, Err.FA_PARAMS)
        }

        if (!data.payer) {
          return cb(null, Err.FA_PARAMS)
        }
        if (data.payer === data.payee) {
          return cb(null, Err.FA_PARAMS)
        }

        data.currency && (data.currency = data.currency.toLowerCase())
        next()
      })
      .add('/', 'get', function (opts, cb, next) {
        opts.conditions || (opts.conditions = {})
        if (opts.data._id) {
          opts.conditions._id = opts.data._id
        }
        if (opts.data.code) {
          opts.conditions.code = opts.data.code
        }
        if (opts.data.payer) {
          opts.conditions.payer = opts.data.payer
        }
        if (opts.data.payee) {
          opts.conditions.payee = opts.data.payee
        }
        next()
      })
      .add('/:id', 'post', function (opts, cb, next) {
        let data = opts.data
        // 检查bill
        if (typeof data.bill === 'string') {
          try {
            data.bill = JSON.parse(data.bill)
          } catch (e) {
          }
        }
        data.bill || (data.bill = {})
        if (!_.isPlainObject(data.bill)) {
          return cb(null, Err.FA_PARAMS)
        }
        // 检查附加参数
        if (typeof data.ext === 'string') {
          try {
            data.ext = JSON.parse(data.ext)
          } catch (e) {
          }
        }
        data.ext || (data.ext = {})
        if (!_.isPlainObject(data.ext)) {
          return cb(null, Err.FA_PARAMS)
        }
        next()
      })
      .use(daorouter(service.pay, {
        list: listOpts,
        get: getOpts
      }))
  })
  return router
}
