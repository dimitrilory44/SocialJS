'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like_post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      models.Like_post.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Like_post.init({
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like_post',
  });
  return Like_post;
};