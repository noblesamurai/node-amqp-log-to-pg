const config = require('../config');
const { tableName } = config.db;

exports.up = async function (knex) {
  knex.schema.alterTable(tableName, function (table) {
    table.jsonb('meta');
  });
};

exports.down = async function (knex) {
  knex.schema.alterTable(tableName, function (table) {
    table.dropColumn('meta');
  });
};
