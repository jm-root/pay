import service from './service'
import router from './router'

export default (opts = {}) => {
  ['db', 'table_name_prefix']
    .forEach(function (key) {
      process.env[key] && (opts[key] = process.env[key])
    })

  let o = service(opts)
  o.router = router
  return o
}
