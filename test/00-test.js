const _knex = require('knex');
const chai = require('chai');
const config = require('./config');
const parseConnection = require('knex/lib/util/parse-connection');

chai.use(require('dirty-chai'));
chai.use(require('chai-as-promised'));

beforeEach(async function () {
  const dbConfig = parseConnection(config.db);
  // Attempt to create the DB in case it doesn't exist.
  try {
    const { connection } = dbConfig;
    const rootDbConfig = { ...dbConfig, connection: { ...connection, database: 'postgres' } };
    console.log({ rootDbConfig });
    const rootDbConn = _knex(rootDbConfig);
    await rootDbConn.raw('CREATE DATABASE :database:;', { database: connection.database });
    await rootDbConn.destroy();
  } catch (error) {
    // 42P04 - DUPLICATE DATABASE (database already exists)... continue anyway.
    if (error.code !== '42P04') throw error;
  }

  this.knex = _knex(dbConfig);
  try {
    await this.knex.raw('DROP TABLE :tableName:', { tableName: config.tableName });
  } catch (error) {
    if (error.code !== '42P01') throw error; // ignore table doesn't exist
  }

  try {
    await this.knex.raw('DROP TABLE knex_migrations');
  } catch (error) {
    if (error.code !== '42P01') throw error; // ignore table doesn't exist
  }

  try {
    await this.knex.raw('DROP TABLE knex_migrations_lock');
  } catch (error) {
    if (error.code !== '42P01') throw error; // ignore table doesn't exist
  }
});

afterEach(async function () {
  this.knex.destroy();
});
