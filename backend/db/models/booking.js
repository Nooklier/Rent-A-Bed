'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
  
    static associate(models) {

      Booking.belongsTo(
        models.Spot,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE'
        }
      )

      Booking.belongsTo(
        models.User,
        {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        }
      )

    }

  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};