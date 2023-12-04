'use strict';

const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  
  class User extends Model {

    /*************************************************** CHECK PASSWORD *************************************************/

    checkPassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    /**************************************************** LOG IN VALIDATION *********************************************/
    static async login({credential, password}) {
      // FIND USER WITH USERNAME OR EMAIL
      const { Op } = require('sequelize')
      const user = await User.findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })

      // CHECK FOR CORRECT PASSWORD
      if (user && user.checkPassword(password)) {
        return await User.findByPk(user.id)
      }
    }

    /******************************************* RELATIONSHIPS & ASSOCIATION *********************************************/
    
    static associate(models) {
      
      User.hasMany( models.Booking, { foreignKey: 'userId', onDelete: 'CASCADE'})
      User.hasMany( models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE'})
      User.hasMany( models.Review, { foreignKey: 'userId',  onDelete: 'CASCADE'})

    }
  }

  /************************************************************************************************************************/
    
      
  User.init({
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
