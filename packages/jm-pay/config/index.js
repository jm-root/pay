require('log4js').configure(require('path').join(__dirname, 'log4js.json'))
var config = {
  development: {
    port: 3000,
    lng: 'zh_CN',
    mqtt: 'mqtt://root:123@api.h5.jamma.cn',
    modules: {
      pay: {
        module: process.cwd() + '/lib'
      },
      'jm-pay-mqtt': {}
    }
  },
  production: {
    port: 80,
    lng: 'zh_CN',
    db: 'mongodb://mongo.db/pay',
    modules: {
      'pay': {
        module: process.cwd() + '/lib'
      },
      'jm-pay-mqtt': {}
    }
  }
}

var env = process.env.NODE_ENV || 'development'
config = config[env] || config['development']
config.env = env

if (process.env['disableMQTT']) delete config.modules['jm-pay-mqtt']

module.exports = config
