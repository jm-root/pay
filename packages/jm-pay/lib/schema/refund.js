const mongoose = require('mongoose')

let Schema = mongoose.Schema

// 退款单
let schemaDefine = {
  code: {type: String, unique: true, sparse: true, index: true}, // 退款编码
  pay: {type: Schema.Types.ObjectId, ref: 'pay'},
  amount: {type: Number}, // 金额 cny单位分,其它虚拟币种正常数
  bill: Schema.Types.Mixed, // 第三方退款票据
  status: {type: Number, default: 0}, // 状态(0:未退;1:已退),该状态为逻辑状态,不代表实际退款结果.
  crtime: {type: Date, default: Date.now},
  moditime: {type: Date}
}

module.exports = function (schema, opts) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}
