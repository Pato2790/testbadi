const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class Flight extends Model { }

Flight.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    flightNumber: {
      allowNull: false,
      type: DataTypes.INTEGER(6),
    },
    flightDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    fleetId: {
      allowNull: false,
      type: DataTypes.INTEGER(11)
    }
  },
  {
    sequelize,
    modelName: 'Flight',
    timestamps: true,
  }
);

module.exports = Flight;