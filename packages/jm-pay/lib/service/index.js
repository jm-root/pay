import jm from 'jm-dao'
import event from 'jm-event'
import user from './user'
import pay from './pay'
import refund from './refund'
import t from '../locale'

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
export default function (opts = {}) {
  let db = opts.db

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
