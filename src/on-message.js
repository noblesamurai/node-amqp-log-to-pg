const debug = require('debug')('amqp-log-to-pg:on-message');

function onMessage (knex, tableName) {
  return function (message, cb) {
    debug('message received', message);
    const insert = { data: JSON.stringify(message) };
    if (message.meta) insert.meta = JSON.stringify(message.meta);
    knex(tableName).insert(insert).asCallback(cb);
  };
}

module.exports = onMessage;
