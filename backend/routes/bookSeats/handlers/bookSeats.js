const Seat = require('../../../models/Seat');
const Flight = require('../../../models/Flight');
const Fleet = require('../../../models/Fleet');
const bookSeatsAlgorithm = require('../helpers/bookSeatsAlgorithm');

const handler = async (req, res, next) => {
  const { bookInfo } = req.body;

  try {
    // Get the fleet asociated with the flight
    const currentFlight = await Flight.findOne({ where: { flightNumber: bookInfo.flightNumber }, include: [{ model: Fleet, as: 'Fleet' }] });

    // Get all the booked seat in the flight
    const currentBookedSeats = await Seat.findAll({ where: { flightId: currentFlight.id } });

    // Define some constant that will help us with the bookSeatsAlgorithm
    const currentFleet = currentFlight.Fleet;
    const acronymSeats = currentFleet.acronymSeats.split(',');
    const seatsBulk = [];
    const mappedCurrentBookedSeats = currentBookedSeats.map((bookedSeat) => bookedSeat.seatName);

    // The endpoind response
    const bookedSeatsResponse = {
      columns: {
        aisle: currentFleet.aisle,
        cantSeats: currentFleet.columnsSeats,
        acronymSeats: acronymSeats
      },
      rows: currentFleet.rowsSeats,
      bookedSeats: mappedCurrentBookedSeats,
      newBookedSeats: [],
      canBook: false
    }

    // Try to find seats to book
    const newBookedSeats = bookSeatsAlgorithm(currentBookedSeats, bookInfo.seatsNumber, currentFleet.columnsSeats, currentFleet.rowsSeats, acronymSeats, currentFleet.aisle);

    // We can not book any seat because all the seat in the fleet are booked
    if (newBookedSeats.length === 0) {
      res.status(200).json(bookedSeatsResponse)
    } else {
      bookedSeatsResponse.canBook = true;
      bookedSeatsResponse.bookedSeats = mappedCurrentBookedSeats.concat(newBookedSeats);
      bookedSeatsResponse.newBookedSeats = newBookedSeats;
    }

    // We found enough seats in the fleet, so we store it in the DB
    for (let seat of newBookedSeats) {
      seatsBulk.push({
        seatName: seat,
        bookedDate: new Date(),
        userBook: `${bookInfo.firstName} ${bookInfo.lastName}`,
        flightId: currentFlight.id
      })
    }

    // Store all the new booked seats in one action.
    await Seat.bulkCreate(seatsBulk, { validate: true });

    // Return the new booked seats
    res.status(200).json(bookedSeatsResponse)
  } catch (err) {
    console.error('Server Error: ', err);
    res.sendStatus(500).json({ msg: 'We have some technical issues. Please, try to book again or contact with support area.' })
    next(err);
  }
}

module.exports = handler;