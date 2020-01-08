const Flight = require('../../../models/Flight');

module.exports = async (req, res, next) => {
  try {
    const allFlight = await Flight.findAll();
    res.status(200).json(allFlight);
  } catch (err) {
    console.error('Server Error: ', err);
    res.sendStatus(500).json({ msg: 'We have some technical issues while try to get the flights' })
    next(err);
  }
}