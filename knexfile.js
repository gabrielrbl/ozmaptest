const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};