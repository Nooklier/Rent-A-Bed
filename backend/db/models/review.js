'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
  
    static associate(models) {
      
      Review.hasMany(
        models.Image,
        {
          foreignKey: 'imageableId',
          onDelete: 'CASCADE'
        }
      )

      Review.belongsTo(
        models.Spot,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE'
        }
      )

      Review.belongsTo(
        models.User,
        {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        }
      )

    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    review: {
      type: DataTypes.STRING,
    },
    stars: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};