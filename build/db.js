const knex = require('knex');
const config = require('../config');
const db = knex(config.db);

const createTable = (name, table) => new Promise((resolve, reject) => {
  Promise.resolve()
  .then(() => db.schema.dropTableIfExists(name))
  .then(() => db.schema.createTable(name, table))
  .then(() => {
    console.log(`${name} table has been created.`);
    return resolve();
  })
})

Promise.all([
  // log table
  createTable('log', (table) => {
    table.string('id', 36).primary();
    table.string('tileId', 255).notNullable();
    table.string('main', 255).notNullable();
    table.datetime('createdAt').notNullable();
  }),

  // tile table
  createTable('tile', (table) => {
    table.string('id', 36).primary();
    table.string('grid', 255).notNullable();
  })
]).catch(err => {
  console.log(err);
}).finally(() => {
  process.exit(0);
})
