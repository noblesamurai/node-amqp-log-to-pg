#!/usr/bin/env node

const config = require('../config');
const { init, consume, shutdown } = require('..');

async function main () {
  await init(config);
  consume();
}

process.on('SIGTERM', () => {
  shutdown();
});

main().catch(console.error);
