const express = require('express');
const bookSeatsRouter = express.Router();
const bookSeats = require('./handlers/bookSeats')

bookSeatsRouter.post('/', bookSeats)

module.exports = bookSeatsRouter;