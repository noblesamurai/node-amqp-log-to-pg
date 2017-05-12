'use strict';

const config = require('./config');
const amqp = require('amqp-wrapper')(config.amqp);
const knex = require('knex')(config.db.knex);
const debug = require('debug')('amqp-log-to-pg');

knex.schema.createTableIfNotExists(config.db.tableName, function (table) {
  table.increments();
  table.jsonb('data');
  table.timestamps(true, true);
}).then(function () {
  amqp.connect().then(function () {
    amqp.consume(onMessage);
  }).catch(console.error);
});

function onMessage (message, cb) {
  debug('message received', message);
  knex(config.db.tableName).insert({ data: JSON.stringify(message) }).asCallback(cb);
}
