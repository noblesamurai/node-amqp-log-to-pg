const chai = require('chai');
const dirtyChai = require('dirty-chai');
const { expect } = chai;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

chai.use(dirtyChai);

describe('The service', () => {
  it('processes a message', done => {
    const insert = sinon.stub();
    const knexStub = function () {
      const me = {};
      me.insert = insert.returns(me);
      me.asCallback = sinon.stub().callsArg(0);
      const returnValue = () => me;

      returnValue.schema = { createTableIfNotExists: sinon.stub().resolves(), hasColumn: sinon.stub().resolves() };
      returnValue.migrate = {
        latest: () => Promise.resolve()
      };
      return returnValue;
    };

    proxyquire('..', {
      'amqp-wrapper' () {
        return {
          connect: sinon.stub().resolves(),
          consume: sinon.stub().callsArgWith(0, { message: 'yeah' }, () => {
            expect(insert.callCount).to.equal(1);
            done();
          })
        };
      },
      knex: knexStub
    }).main();
  });
});
