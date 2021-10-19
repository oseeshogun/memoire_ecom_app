import { Model, Sequelize, DataTypes, ModelCtor } from "sequelize";

export default (sequelize: Sequelize): ModelCtor<Model<any, any>> => {
  const Product = sequelize.define("product", {
    titre: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    device: {
        type: DataTypes.STRING
    },
    images: {
        type: DataTypes.TEXT
    }
  });

  return Product;
};
