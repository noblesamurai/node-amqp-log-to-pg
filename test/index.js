const chai = require('chai');
const config = require('./config');
const { expect } = chai;
const { init, shutdown } = require('..');

describe('init()', () => {
  it('throw on invalid config', async () => {
    console.log(init);
    await expect(init()).to.eventually.be.rejectedWith(Error, 'to be of type');
  });

  it('ititialises', async () => {
    await init(config);
    shutdown();
  });
});
