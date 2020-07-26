'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user,{
        as:'user'
      });
    }
  };
  post.init({
    title: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING,
      allowNull:false,
      foreignKey:true,
      references: {
        model: "users",
        key: "id"
      }
    },
    content:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};
