'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
  
    static associate(models) {
      Image.belongsTo(
        models.Review,
        {
          foreignKey: 'imageableId',
          onDelete: 'CASCADE'
        }
      )

      Image.belongsTo(
        models.Spot,
        {
          foreignKey: 'imageableId',
          onDelete: 'CASCADE'
        }
      )

    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN
    },
    imageableId: {
      type: DataTypes.INTEGER
    },
    imagetableType: {
      type: DataTypes.STRING
    }    
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};