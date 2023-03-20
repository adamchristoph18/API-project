'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  Booking.init({
    id: { // because it is a through/join table
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Spots' },
      onDelete: 'CASCADE'
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
      onDelete: 'CASCADE'
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
