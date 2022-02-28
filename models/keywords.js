"use strict";
const { Model } = require("sequelize");
// const keyword_post = require("./keyword_post");
module.exports = (sequelize, DataTypes) => {
  class keywords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, KeywordPost }) {
      // define association her
      this.belongsToMany(Post, {
        through: KeywordPost,
        foreignKey: "keyId",
        // onDelete: "cascade",
        hooks: true,
      });
    }
  }
  keywords.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      values: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "keywords",
      // tableName: "keywords",
    }
  );
  return keywords;
};
