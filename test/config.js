module.exports = {
  amqp: {
    url: 'amqp://guest:guest@rabbitmq//',
    exchange: 'mine',
    queue: {
      name: 'the-queue',
      routingKey: 'routing-key'
    }
  },
  db: 'postgres://postgres:password@postgres/test-db',
  tableName: 'test-table'
};
