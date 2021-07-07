const envVar = require('env-var');
module.exports = {
  amqp: {
    url: envVar.get('TEST_RABBITMQ_URL').asUrlString(),
    exchange: 'mine',
    queue: {
      name: 'the-queue',
      routingKey: 'routing-key'
    }
  },
  db: envVar.get('TEST_DATABASE_URL').asUrlString(),
  tableName: 'test-table',
  runMigrations: true
};
