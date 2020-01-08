const Fleet = require('../../../models/Fleet');

module.exports = async (req, res, next) => {
  const { fleetName, rowsSeats, columnsSeats, acronymSeats, aisle } = req.body;

  try {
    const newFleet = Flight.create({
      fleetName,
      rowsSeats,
      columnsSeats,
      acronymSeats,
      aisle
    });
    res.status(200).json(newFleet)
  } catch (err) {
    console.error('Server Error: ', err);
    res.sendStatus(500).json({ msg: 'We have some technical issues while try to add a new fleet' });
    next(err);
  }
}
