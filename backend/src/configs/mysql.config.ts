import { Options } from 'sequelize';
require('dotenv').config();

export const DATABASE = process.env.MYSQL_DB_NAME || 'manga_db';

export const USERNAME = process.env.MYSQL_USERNAME || 'root';

export const PASSWORD = process.env.MYSQL_PASSWORD || '';


export const options:Options = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: +(process.env.MYSQL_PORT || 3306),
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000,
    charset: "utf8mb4"
    // useUTC: true,
  },
  define: {
    collate: "utf8mb4_unicode_ci",
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  },
  timezone: '+07:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
