"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const Product = sequelize.define('product', {
        titre: {
            type: sequelize_1.DataTypes.STRING,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
        },
        rating: {
            type: sequelize_1.DataTypes.FLOAT,
        },
        price: {
            type: sequelize_1.DataTypes.FLOAT,
        },
        device: {
            type: sequelize_1.DataTypes.STRING
        },
        images: {
            type: sequelize_1.DataTypes.TEXT
        }
    });
    return Product;
};
//# sourceMappingURL=product.js.map