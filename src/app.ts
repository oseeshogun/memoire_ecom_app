import express from 'express';
import config from './config';
import mysql from 'mysql';
import { Sequelize } from 'sequelize';
import path from 'path';

import user from './models/user';
import product from './models/product';
import auth from './apis/auth';
import productApis from './apis/product';

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

// Create Mysql connection
const sequelize = new Sequelize({
  database: config.MYSQL_DB,
  dialect: 'mysql',
  username: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
});
// const sequelize = new Sequelize("sqlite::memory:");

const User = user(sequelize);
const Product = product(sequelize);

// register new user api
auth(app, sequelize, User);
productApis(app, sequelize, Product);

// (async () => {
//   await sequelize.sync();
// })();
app.listen(config.PORT, function () {
  console.log('server listening on port ', config.PORT);
});
function PoolOptions(): import('sequelize').PoolOptions {
  throw new Error('Function not implemented.');
}

