const jm = require('jm-dao')
const event = require('jm-event')
const consts = require('../consts')
const _schema = require('../schema/refund')

let Err = consts.Err

module.exports = function (service, opts = {}) {
  let sq = service.sq
  let schema = opts.schema || _schema()

  schema.pre('save', function (next) {
    let self = this
    if (self.code !== undefined) return next()
    schema.createCode(function (err, val) {
      if (err) {
        return next(err)
      }
      self.code = val
      next()
    })
  })
  let sequenceRefundCode = opts.sequenceRefundCode || consts.SequenceRefundCode
  schema.createCode = function (cb) {
    sq.next(sequenceRefundCode, {}, function (err, val) {
      if (err) {
        return cb(err, Err.FA_CREATE_REFUNDCODE)
      }
      cb(null, val)
    })
  }

  schema
    .post('save', function (doc) {
      doc && (service.emit('refund.save', {id: doc.id}))
    })
    .post('remove', function (doc) {
      doc && (service.emit('refund.remove', {id: doc.id}))
    })
    .post('findOneAndRemove', function (doc) {
      doc && (service.emit('refund.remove', {id: doc.id}))
    })
    .post('update', function (doc) {
      if (!doc.result.nModified) return
      this.model
        .find(this._conditions)
        .then(function (docs) {
          docs.forEach(function (doc) {
            service.emit('refund.update', {id: doc.id})
          })
        })
    })
    .post('findOneAndUpdate', function (doc) {
      doc && (service.emit('refund.update', {id: doc.id}))
    })

  let model = jm.dao({
    db: opts.db,
    modelName: opts.modelName || 'refund',
    tableName: opts.tableName,
    prefix: opts.table_name_prefix,
    schema: schema,
    schemaExt: opts.schemaExt
  })
  event.enableEvent(model)

  return model
}
