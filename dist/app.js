"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./models/user"));
const product_1 = __importDefault(require("./models/product"));
const auth_1 = __importDefault(require("./apis/auth"));
const product_2 = __importDefault(require("./apis/product"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express_1.default.static('public'));
// Create Mysql connection
const sequelize = new sequelize_1.Sequelize({
    database: config_1.default.MYSQL_DB,
    dialect: "mysql",
    username: config_1.default.MYSQL_USER,
    password: config_1.default.MYSQL_PASSWORD,
    host: config_1.default.MYSQL_HOST,
    port: config_1.default.MYSQL_PORT,
});
// const sequelize = new Sequelize("sqlite::memory:");
const User = (0, user_1.default)(sequelize);
const Product = (0, product_1.default)(sequelize);
// register new user api
(0, auth_1.default)(app, sequelize, User);
(0, product_2.default)(app, sequelize, Product);
// (async () => {
//   await sequelize.sync();
// })();
app.listen(config_1.default.PORT, function () {
    console.log("server listening on port ", config_1.default.PORT);
});
function PoolOptions() {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=app.js.map