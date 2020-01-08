const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class Fleet extends Model { }

Fleet.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    fleetName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rowsSeats: {
      allowNull: false,
      type: DataTypes.INTEGER(2),
    },
    columnsSeats: {
      allowNull: false,
      type: DataTypes.INTEGER(1),
    },
    acronymSeats: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    aisle: {
      allowNull: false,
      type: DataTypes.INTEGER(1),
    }
  },
  {
    sequelize,
    modelName: 'Fleet',
    timestamps: true,
  }
);

module.exports = Fleet;