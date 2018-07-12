import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 支付
let schemaDefine = {
  code: {type: String, unique: true, sparse: true, index: true}, // 支付编码
  appId: {type: String, sparse: true, index: true, default: ''}, // appid ''代表自有平台
  orderId: {type: String, index: true}, // 关联订单
  payee: {type: Schema.Types.ObjectId, ref: 'user'}, /* 收款用户 */
  payer: {type: Schema.Types.ObjectId, ref: 'user'}, /* 付款用户 */
  channel: {type: String, index: true, default: ''}, // 支付方式 wechat
  currency: {type: String, index: true, default: 'cny'}, // 币种
  amount: {type: Number, default: 0}, // 金额 单位分
  bill: Schema.Types.Mixed, // 第三方支付票据
  memo: {type: String}, // 备注
  title: {type: String},
  content: {type: String},
  isHtml: {type: Boolean, default: true},
  crtime: {type: Date, default: Date.now},
  moditime: {type: Date},
  tags: [String],
  status: {type: Number, default: 1}, // 0无效 1未支付 2已支付 3已退款
  ip: {type: String},
  ext: Schema.Types.Mixed
}

module.exports = function (schema, opts) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}
