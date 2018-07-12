import config from '../config'
import $ from '../src'

let service = $(config)
let router = service.router()

export default {
  service,
  router
}
