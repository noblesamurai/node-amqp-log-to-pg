const ow = require('ow');

class CustomMigrationSource {
  constructor (tableName) {
    ow(tableName, ow.string.nonEmpty);
    this.tableName = tableName;
  }

  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want, they will be passed as
  // arguments to getMigrationName and getMigration
  async getMigrations () {
    // In this example we are just returning migration names
    return ['create-logging-table'];
  }

  getMigrationName (migration) {
    return migration;
  }

  getMigration (migration) {
    const { tableName } = this;
    switch (migration) {
      case 'create-logging-table':
        return {
          async up (knex) {
            return knex.schema.createTable(tableName, table => {
              table.increments();
              table.jsonb('data');
              table.timestamps(true, true);
              table.jsonb('meta');
            });
          },
          async down (knex) {
            return knex.schema.dropTable(tableName);
          }
        };
      default: throw new Error('unknown migration');
    }
  }
}

module.exports = CustomMigrationSource;
