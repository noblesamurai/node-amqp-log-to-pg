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
    url: process.env.DATABASE_URL,
    tableName: process.env.DATABASE_TABLE_NAME
  }
};
