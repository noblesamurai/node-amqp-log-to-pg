const _knex = require('knex');
const chai = require('chai');
const config = require('./config');
const parseConnection = require('knex/lib/util/parse-connection');

chai.use(require('dirty-chai'));
chai.use(require('chai-as-promised'));

beforeEach(async function () {
  const dbConfig = parseConnection(config.db);
  // Attempt to create the DB in case it doesn't exist.
  let rootDbConn;
  try {
    const { connection } = dbConfig;
    const rootDbConfig = { ...dbConfig, connection: { ...connection, database: 'postgres' } };
    rootDbConn = _knex(rootDbConfig);
    await rootDbConn.raw('CREATE DATABASE :database:;', { database: connection.database });
  } catch (error) {
    // 42P04 - DUPLICATE DATABASE (database already exists)... continue anyway.
    if (error.code !== '42P04') throw error;
  } finally {
    await rootDbConn.destroy();
  }

  this.knex = _knex(dbConfig);

  // Remove all the tables so the migrations will run again.
  const tables = [config.tableName, 'knex_migrations', 'knex_migrations_lock'];
  await Promise.all(tables.map(name => this.knex.schema.dropTableIfExists(name)));
});

afterEach(async function () {
  await this.knex.destroy();
});
