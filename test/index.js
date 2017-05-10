'use strict';

const chai = require('chai');
const dirtyChai = require('dirty-chai');
const expect = chai.expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

chai.use(dirtyChai);

describe('The service', function () {
  it('processes a message', function (done) {
    const insert = sinon.stub();
    const knexStub = function () {
      const me = this;
      me.insert = insert.returns(me);
      me.asCallback = sinon.stub().callsArg(0);
      let ret = function () { return me; };
      ret.schema = { createTableIfNotExists: sinon.stub().resolves() };
      return ret;
    };
    proxyquire('..', {
      'amqp-wrapper': function () {
        return {
          connect: sinon.stub().resolves(),
          consume: sinon.stub().callsArgWith(0, { message: 'yeah' }, function () {
            expect(insert.callCount).to.equal(1);
            done();
          })
        };
      },
      knex: knexStub
    });
  });
});
