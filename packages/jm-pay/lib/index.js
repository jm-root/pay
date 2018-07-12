const service = require('./service')
const router = require('./router')

module.exports = (opts = {}) => {
  ['db', 'table_name_prefix']
    .forEach(function (key) {
      process.env[key] && (opts[key] = process.env[key])
    })

  let o = service(opts)
  o.router = router
  return o
}
