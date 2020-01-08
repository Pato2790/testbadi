const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize.init');

class Seat extends Model { }

Seat.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
    },
    seatName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    userBook: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    bookedDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    flightId: {
      allowNull: false,
      type: DataTypes.INTEGER(11)
    }
  },
  {
    sequelize,
    modelName: 'Seat',
    timestamps: true,
  }
);

module.exports = Seat;