require('dotenv').config();
const Sequelize = require('sequelize');
const url = require('url');

let databaseUrl = process.env.CLEARDB_DATABASE_URL || process.env.JAWSDB_URL;
let sequelize;

if (databaseUrl) {
  const dbUrlParts = url.parse(databaseUrl);
  const [username, password] = dbUrlParts.auth.split(':');

  sequelize = new Sequelize(dbUrlParts.pathname.substring(1), username, password, {
    host: dbUrlParts.hostname,
    dialect: 'mysql',
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
    }
  );
}

module.exports = sequelize;