import jm from 'jm-dao'
import event from 'jm-event'
import _schema from '../schema/user'

export default function (service, opts = {}) {
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
};