const envVar = require('env-var');

module.exports = {
  amqp: {
    url: envVar.get('AMQP_URL').asUrlString(),
    exchange: envVar.get('AMQP_EXCHANGE').asString(),
    queue: {
      name: envVar.get('AMQP_CONSUME').asString(),
      routingKey: envVar.get('AMQP_ROUTING_KEY').asString()
    }
  },
  db: envVar.get('DATABASE_URL').asUrlString(),
  tableName: envVar.get('DATABASE_TABLE_NAME').asString()
};
