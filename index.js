'use strict';

const config = require('./config');
const debug = require('debug')('amqp-log-to-pg');

function main () {
  const knex = require('knex')(config.db.knex);
  knex.migrate.latest().then(function () {
    const amqp = require('amqp-wrapper')(config.amqp);
    amqp.connect().then(function () {
      amqp.consume(onMessage);
    });
  }).catch(console.error);

  function onMessage (message, cb) {
    debug('message received', message);
    const insert = { data: JSON.stringify(message) };
    if (message.meta) insert.meta = JSON.stringify(message.meta);
    knex(config.db.tableName).insert(insert).asCallback(cb);
  }
}

if (module.main !== module) {
  module.exports.main = main;
} else {
  main();
}
