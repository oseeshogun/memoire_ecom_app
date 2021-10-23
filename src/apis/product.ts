import { Express } from "express";
import { Model, ModelCtor, Sequelize, Op } from "sequelize";
import { products } from "../data/products";

export default (
  app: Express,
  sequelize: Sequelize,
  Product: ModelCtor<Model<any, any>>
) => {
  app.post("/create_articles/", (req, res) => {
    for (let i = 0; i < products.length; i++) {
      const data: {} = products[i];
      Product.create(data);
    }
  });

  app.get("/new/", (req, res) => {
    Product.findAll({
      offset: 7,
    })
      .then((products) => {
        return res.json(
          products.map((product) => {
            return {
              ...product.toJSON(),
              images: JSON.parse(product.getDataValue("images")),
            };
          })
        );
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
  });

  app.post("/search/", (req, res) => {
    const { query } = req.body;

    Product.findAll({
      where: {
        description: {
          [Op.like]: `%${query}%`,
        },
      },
    })
      .then((products) => {
        return res.json(
          products.map((product) => {
            return {
              ...product.toJSON(),
              images: JSON.parse(product.getDataValue("images")),
            };
          })
        );
      })
      .catch((err) => {
        return res.json([]);
      });
  });

  app.get("/populars/", (req, res) => {
    Product.findAll({
      limit: 7,
    })
      .then((products) => {
        return res.json(
          products.map((product) => {
            return {
              ...product.toJSON(),
              images: JSON.parse(product.getDataValue("images")),
            };
          })
        );
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
  });
};
