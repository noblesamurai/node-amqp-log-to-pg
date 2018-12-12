const config = require('../config');
const { tableName } = config.db;

console.log({tableName});

exports.up = async function (knex) {
  if (knex.schema.hasTable(tableName)) return;
  knex.schema.createTable(tableName, function (table) {
    table.increments();
    table.jsonb('data');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
