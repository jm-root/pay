const log = require('jm-log4js')
const logger = log.getLogger('pay')
const MS = require('jm-ms')

let ms = MS()

module.exports = function (opts, app) {
  ['gateway'].forEach(function (key) {
    process.env[key] && (opts[key] = process.env[key])
  })

  let o = {
    ready: true,

    onReady: function () {
      return this.ready
    }
  }

  let bind = (name, uri) => {
    uri || (uri = '/' + name)
    ms.client({
      uri: opts.gateway + uri
    }, function (err, doc) {
      !err && doc && (o[name] = doc)
    })
  }
  bind('mq')

  if (!app.modules.pay) {
    logger.warn('no pay module found. so I can not work.')
    return o
  }
  if (!opts.gateway) {
    logger.warn('no gateway config. so I can not work.')
    return o
  }

  let pay = app.modules.pay

  let send = async function (topic, message) {
    return o.mq.post(`/${topic}`, {message})
      .catch(e => {
        logger.error(`send mq fail. topic: ${topic} message: ${JSON.stringify(message)}`)
        logger.error(e)
      })
  }
  pay.on('pay.status', function (opts) {
    opts && (send('pay.status', opts))
  })
  pay.on('pay.update', function (opts) {
    opts && (send('pay.update', opts))
  })
  pay.on('pay.remove', function (opts) {
    opts && (send('pay.remove', opts))
  })
  pay.on('refund.status', function (opts) {
    opts && (send('refund.status', opts))
  })
  pay.on('refund.update', function (opts) {
    opts && (send('refund.update', opts))
  })
  pay.on('refund.remove', function (opts) {
    opts && (send('refund.remove', opts))
  })
}
