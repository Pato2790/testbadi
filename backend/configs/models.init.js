const Fleet = require('../models/Fleet');
const Flight = require('../models/Flight');
const Seat = require('../models/Seat');

const initModel = async () => {
  
  // Fleet - Flight Relations
  Fleet.hasMany(Flight, { as: 'Fligth', foreignKey: 'fleetId' });
  Flight.belongsTo(Fleet, { as: 'Fleet', foreignKey: 'fleetId' });
  
  // Seat - Flight Relations
  Flight.hasMany(Seat, { as: 'Seat', foreignKey: 'flightId' });
  Seat.belongsTo(Flight, { as: 'Flight', foreignKey: 'flightId' });

  await Fleet.sync();
  await Flight.sync();
  await Seat.sync();
}

module.exports = initModel