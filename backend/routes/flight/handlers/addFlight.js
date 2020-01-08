const Flight = require('../../../models/Flight');

module.exports = async (req, res, next) => {
  const { flightNumber, flightDate, fleetId } = req.body;

  try {
    const newFlight = Flight.create({
      flightNumber,
      flightDate,
      fleetId,
    });
    res.status(200).json({ newFlight })
  } catch (err) {
    console.error('Server Error: ', err);
    res.sendStatus(500).json({ msg: 'We have some technical issues while try to add a new flight' });
    next(err);
  }
}
