'use strict';

const config = require('./config');
const knex = require('knex')(config.db.knex);
const debug = require('debug')('amqp-log-to-pg');

let hasMeta;
function migrate () {
  return knex.schema.createTableIfNotExists(config.db.tableName, function (table) {
    table.increments();
    table.jsonb('meta');
    table.jsonb('data');
    table.timestamps(true, true);
  }).then(() => {
    return knex.schema.hasColumn(config.db.tableName, 'meta');
  });
}

function main () {
  migrate().then(function (result) {
    const amqp = require('amqp-wrapper')(config.amqp);
    hasMeta = result;
    amqp.connect().then(function () {
      amqp.consume(onMessage);
    }).catch(console.error);
  });
}

function onMessage (message, cb) {
  debug('message received', message);
  const insert = { data: JSON.stringify(message) };
  if (hasMeta && message.meta) insert.meta = JSON.stringify(message.meta);
  knex(config.db.tableName).insert(insert).asCallback(cb);
}

if (module.main !== module) {
  module.exports.migrate = migrate;
  module.exports.main = main;
} else {
  main();
}
