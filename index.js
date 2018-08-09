'use strict';

const config = require('./config');
const debug = require('debug')('amqp-log-to-pg');
const knex = require('knex')(config.db.knex);

async function main () {
  try {
    const amqp = require('amqp-wrapper')(config.amqp);
    debug('running migrations...');
    await knex.migrate.latest();
    debug('connecting to AMQP...');
    await amqp.connect();
    debug('ready...');
    amqp.consume(onMessage);
  } catch (err) {
    console.error(err);
  }
}

function onMessage (message, cb) {
  debug('message received', message);
  const insert = { data: JSON.stringify(message) };
  if (message.meta) insert.meta = JSON.stringify(message.meta);
  knex(config.db.tableName).insert(insert).asCallback(cb);
}

if (require.main !== module) {
  module.exports.main = main;
} else {
  main();
}
