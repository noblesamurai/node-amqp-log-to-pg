const envVar = require('env-var');
module.exports = {
  amqp: {
    url: 'amqp://guest:guest@rabbitmq//',
    exchange: 'mine',
    queue: {
      name: 'the-queue',
      routingKey: 'routing-key'
    }
  },
  db: envVar.get('TEST_DATABASE_URL').default('postgres://postgres:password@postgres/test-db').asUrlString(),
  tableName: 'test-table'
};
