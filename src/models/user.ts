import { Model, Sequelize, DataTypes, ModelCtor } from 'sequelize';

export default (sequelize: Sequelize): ModelCtor<Model<any, any>> => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
