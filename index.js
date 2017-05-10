'use strict';

const config = require('./config');
const amqp = require('amqp-wrapper')(config.amqp);
const knex = require('knex')(config.db.knex);

knex.schema.createTableIfNotExists(config.db.tableName, function (table) {
  table.increments();
  table.jsonb(config.db.tableName);
  table.timestamps(true, true);
});

amqp.connect().then(function () {
  amqp.consume(onMessage);
}).catch(console.error);

function onMessage (message, cb) {
  knex(config.db.tableName).insert(message).asCallback(cb);
}
