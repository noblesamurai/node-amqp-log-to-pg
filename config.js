var parseUrl = require('knex/lib/util/parse-connection');

module.exports = {
  amqp: {
    url: process.env.AMQP_URL,
    exchange: process.env.AMQP_EXCHANGE,
    queue: {
      name: process.env.AMQP_CONSUME,
      routingKey: process.env.AMQP_ROUTING_KEY
    }
  },
  db: {
    knex: {
      client: 'pg',
      connection: parseUrl(process.env.DATABASE_URL),
    },
    tableName: process.env.DATABASE_TABLE_NAME
  }
};

module.exports.db.knex.connection.ssl = true;
