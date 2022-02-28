"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KeywordPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, keywords }) {
      // define association here
      this.belongsTo(Post, {
        foreignKey: "post_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      this.belongsTo(keywords, {
        foreignKey: "keyId",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  KeywordPost.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      keyId: {
        type: DataTypes.INTEGER,
      },
      post_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "KeywordPost",
      tableName: "keyword_post",
    }
  );
  return KeywordPost;
};
