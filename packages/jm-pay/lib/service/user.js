const jm = require('jm-dao')
const event = require('jm-event')
const _schema = require('../schema/user')

module.exports = function (service, opts = {}) {
  let schema = opts.schema || _schema()

  let model = jm.dao({
    db: opts.db,
    modelName: opts.modelName || 'user',
    tableName: opts.tableName,
    prefix: opts.table_name_prefix,
    schema: schema,
    schemaExt: opts.schemaExt
  })
  event.enableEvent(model)

  return model
}
