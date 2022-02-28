'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fileurl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.belongsTo(Post,{foreignKey:'postId',as:'posts'}) 
    }
  }
  fileurl.init({

    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'fileurl',
    tableName:'fileurls'
  });
  return fileurl;
};