"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../data/products");
exports.default = (app, sequelize, Product) => {
    app.post("/create_articles/", (req, res) => {
        for (let i = 0; i < products_1.products.length; i++) {
            const data = products_1.products[i];
            Product.create(data);
        }
    });
    app.get("/populars/", (req, res) => {
        Product.findAll()
            .then((products) => {
            return res.json(products.map((product) => {
                return Object.assign(Object.assign({}, product.toJSON()), { images: JSON.parse(product.getDataValue("images")) });
            }));
        })
            .catch((err) => {
            return res.sendStatus(500);
        });
    });
};
//# sourceMappingURL=product.js.map