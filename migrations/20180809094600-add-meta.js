const config = require('../config');
const { tableName } = config.db;

exports.up = function (knex) {
  return knex.schema.alterTable(tableName, table => {
    table.jsonb('meta');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable(tableName, table => {
    table.dropColumn('meta');
  });
};
