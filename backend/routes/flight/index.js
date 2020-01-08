const express = require('express');
const flight = express.Router();
const getFlights = require('./handlers/getFlights');
const postFlight = require('./handlers/getFlights');

flight.get('/', getFlights);
flight.post('/', postFlight);

module.exports = flight;