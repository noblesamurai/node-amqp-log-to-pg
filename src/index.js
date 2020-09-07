const CustomMigrationSource = require('./migration-source');
const debug = require('debug')('amqp-log-to-pg');
const onMessage = require('./on-message');
const ow = require('ow');
const parseConnection = require('knex/lib/util/parse-connection');

const validateConfig = config => {
  ow(config, ow.object.partialShape({
    amqp: ow.object.exactShape({
      url: ow.string.url,
      exchange: ow.string.nonEmpty,
      queue: ow.object.exactShape({
        name: ow.string.nonEmpty,
        routingKey: ow.string.nonEmpty
      })
    }),
    db: ow.string.url,
    tableName: ow.string.nonEmpty
  }));
};

let amqp;
let knex;
let tableName;
async function init (config) {
  validateConfig(config);

  tableName = config.tableName;
  const dbConfig = parseConnection(config.db);
  if (process.env.NODE_ENV === 'production') dbConfig.connection.ssl = true;
  knex = require('knex')(dbConfig);
  amqp = require('amqp-wrapper')(config.amqp);
  debug('running migrations...');
  await knex.migrate.latest({ migrationSource: new CustomMigrationSource(config.tableName) });
  debug('connecting to AMQP...');
  await amqp.connect();
  debug('ready...');
}

function consume () {
  amqp.consume(onMessage(knex, tableName));
}

async function main () {
  const config = require('../config');
  await init(config);
  consume();
}

async function shutdown () {
  return new Promise((resolve, reject) => {
    debug('shutting down amqp...');
    amqp.close(closed);

    function closed (err) {
      if (err) return reject(err);
      debug('shutting down knex...');
      // eslint-disable-next-line promise/prefer-await-to-then
      knex.destroy().then(resolve).catch(reject);
    }
  });
}

if (require.main === module) {
  main();
} else {
  module.exports = { init, consume, shutdown };
}
