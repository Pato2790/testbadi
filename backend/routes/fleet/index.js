const express = require('express');
const fleet = express.Router();
const addFleet = require('./handlers/addFleet');

fleet.post('/', addFleet);

module.exports = fleet;