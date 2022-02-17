'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user'  })
    }
    toJSON() {
      return { ...this.get(), id: undefined, userId:  undefined }
    }
  }
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'User must provide a Title'},
        notEmpty:{msg: 'Title must not be empty'}
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'User must provide a Body'},
          notEmpty:{msg: 'Body must not be empty'}
      }
    },
  }, {
    sequelize,
    tableName: "Posts",
    modelName: 'Post',
  });
  return Post;
};