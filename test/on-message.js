const config = require('./config');
const onMessage = require('../src/on-message');
const { expect } = require('chai');
const { init, shutdown } = require('..');
const { tableName } = require('./config');

describe('on-message', () => {
  beforeEach(async () => {
    await init(config);
  });
  afterEach(async () => {
    await shutdown();
  });
  it('inserts a record', function (done) {
    const { knex } = this;
    onMessage(this.knex, tableName)({ sample: 'message' }, cb);

    function cb (error) {
      if (error) return done(error);
      knex(tableName).select().then(result => {
        expect(result.length).to.equal(1);
        done();
      });
    }
  });
});
