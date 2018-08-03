'use strict';

const config = require('./config');
const amqp = require('amqp-wrapper')(config.amqp);
const knex = require('knex')(config.db.knex);
const debug = require('debug')('amqp-log-to-pg');

let hasMeta;
knex.schema.createTableIfNotExists(config.db.tableName, function (table) {
  table.increments();
  table.jsonb('meta');
  table.jsonb('data');
  table.timestamps(true, true);
}).then(function () {
  return knex.schema.hasColumn(config.db.tableName, 'meta');
}).then(function (result) {
  hasMeta = result;
  amqp.connect().then(function () {
    amqp.consume(onMessage);
  }).catch(console.error);
});

function onMessage (message, cb) {
  debug('message received', message);
  const insert = { data: JSON.stringify(message) };
  if (hasMeta && message.meta) insert.meta = JSON.stringify(message.meta);
  knex(config.db.tableName).insert(insert).asCallback(cb);
}
