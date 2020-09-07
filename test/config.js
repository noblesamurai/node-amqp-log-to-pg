module.exports = {
  amqp: {
    url: '
    exchange: 'mine',
    queue: {
      name: 'the-queue',
      routingKey: 'routing-key'
    }
  },
  db: '',
  tableName: 'test-table'
};
