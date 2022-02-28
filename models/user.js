"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userId", as: "posts" });
    }

    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must provide a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
          notNull: { msg: "User must provide a email" },
          notEmpty: { msg: "Email must not be empty" },
          isEmail: { msg: "Provide a valid email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must provide a password" },
          notEmpty: { msg: "Password cannot not be empty" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must provide a Role" },
          notEmpty: { msg: "Role must not be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
