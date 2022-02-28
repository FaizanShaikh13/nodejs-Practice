"use strict";
const { Model } = require("sequelize");
// const keyword_post = require("./keyword_post");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, keywords, KeywordPost, fileurl }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.belongsToMany(keywords, {
        through: KeywordPost,
        foreignKey: "post_id",
        // onDelete: "cascade",
        hooks: true,
      });
      this.hasOne(fileurl, {
        foreignKey: "postId",
        as: "fileurls",
        onDelete: "cascade",
        hooks: true,
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must provide a Title" },
          notEmpty: { msg: "Title must not be empty" },
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must provide a Body" },
          notEmpty: { msg: "Body must not be empty" },
        },
      },
      keyword: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      files: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    }
  );
  return Post;
};
