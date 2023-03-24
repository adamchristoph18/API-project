'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' });

      Spot.hasMany(models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true });
      Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true });
    }
  }
  Spot.init({
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lat: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true,
        isDecimal: true,
        min: -90,
        max: 90
      }
    },
    lng: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true,
        isDecimal: true,
        min: -180,
        max: 180
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [5, 49]
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
