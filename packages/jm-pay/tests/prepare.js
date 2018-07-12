const config = require('../config')
const $ = require('../src')

let service = $(config)
let router = service.router()

module.exports = {
  service,
  router
}
