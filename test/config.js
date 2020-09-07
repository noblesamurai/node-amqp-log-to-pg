const envVar = require('env-var');
module.exports = {
  amqp: {
    url: envVar.get('TEST_RABBITMQ_URL').default('amqp://guest:guest@rabbitmq//').asUrlString(),
    exchange: 'mine',
    queue: {
      name: 'the-queue',
      routingKey: 'routing-key'
    }
  },
  db: envVar.get('TEST_DATABASE_URL').default('postgres://postgres:password@postgres/test-db').asUrlString(),
  tableName: 'test-table'
};
