const jm = require('jm-dao')
const event = require('jm-event')
const user = require('./user')
const pay = require('./pay')
const refund = require('./refund')
const t = require('../locale')

/**
 * pay service
 * @param {Object} opts
 * @example
 * opts参数:{
 *  db: 数据库
 *  table_name_prefix: (可选, 表名前缀, 默认为'')
 * }
 * @return {Object} service
 */
module.exports = function (opts = {}) {
  let db = opts.db

  opts.channels || (opts.channels = [])
  let o = {
    ready: false,
    config: opts,
    t: t,

    onReady: function () {
      let self = this
      return new Promise(function (resolve, reject) {
        if (self.ready) return resolve(self.ready)
        self.on('ready', function () {
          resolve()
        })
      })
    }
  }
  event.enableEvent(o)

  let cb = function (db) {
    opts.db = db
    o.sq = jm.sequence({db: db})
    o.user = user(o, opts)
    o.pay = pay(o, opts)
    o.refund = refund(o, opts)
    o.ready = true
    o.emit('ready')
  }

  if (!db) {
    db = jm.db.connect().then(cb)
  } else if (typeof db === 'string') {
    db = jm.db.connect(db).then(cb)
  }

  return o
}
