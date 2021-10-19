"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
    return User;
};
//# sourceMappingURL=user.js.map