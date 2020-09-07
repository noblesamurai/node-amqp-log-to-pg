const config = require('../config');
const { tableName } = config.db;

exports.up = async function (knex) {
  if (await knex.schema.hasTable(tableName)) return;
  return knex.schema.createTable(tableName, table => {
    table.increments();
    table.jsonb('data');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
