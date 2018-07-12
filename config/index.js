require('log4js').configure(require('path').join(__dirname, 'log4js.json'))
var config = {
  development: {
    port: 3000,
    lng: 'zh_CN',
    gateway: 'http://gateway.test.jamma.cn',
    modules: {
      pay: {
        module: 'jm-pay',
        prefix: '/pay'
      },
      'jm-pay-mq': {}
    }
  },
  production: {
    port: 80,
    db: 'mongodb://mongo.db/pay',
    gateway: 'http://gateway.app',
    modules: {
      pay: {
        module: 'jm-pay',
        prefix: '/pay'
      },
      'jm-pay-mq': {}
    }
  }
}

var env = process.env.NODE_ENV || 'development'
config = config[env] || config['development']
config.env = env

if (process.env['disable_mq']) delete config.modules['jm-pay-mq']

module.exports = config
