"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const config = Object.assign(Object.assign({}, process.env), { PORT: process.env.PORT || 5500, STATIC: "./public", MYSQL_HOST: process.env.MYSQL_HOST || "localhost", MYSQL_USER: process.env.MYSQL_USER, MYSQL_PASSWORD: process.env.MYSQL_PASSWORD, MYSQL_DB: process.env.MYSQL_DB, MYSQL_PORT: parseInt(process.env.MYSQL_PORT) || 5432 });
exports.default = config;
//# sourceMappingURL=config.js.map