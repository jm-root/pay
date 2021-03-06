const mongoose = require('mongoose')

let Schema = mongoose.Schema

let schemaDefine = {
  nick: {type: String}, // 昵称，可重复
  name: {type: String} // 真实姓名
}

module.exports = function (schema) {
  schema || (schema = new Schema())
  schema.add(schemaDefine)
  return schema
}
