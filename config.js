var parseConnection = require('knex/lib/util/parse-connection');
const dbConfig = parseConnection(process.env.DATABASE_URL);

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
    knex: dbConfig,
    tableName: process.env.DATABASE_TABLE_NAME
  }
};

if (process.env.NODE_ENV === 'production') dbConfig.connection.ssl = true;
