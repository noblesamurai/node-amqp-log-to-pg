const envVar = require('env-var');
module.exports = {
  amqp: {
    url: '
    exchange: 'mine',
    queue: {
      name: 'the-queue',
      routingKey: 'routing-key'
    }
  },
  db: envVar.get('TEST_DATABASE_URL').default('').asUrlString(),
  tableName: 'test-table'
};
