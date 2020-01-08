-- phpMyAdmin SQL Dump
-- version 5.0.0
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 07-01-2020 a las 22:26:40
-- Versión del servidor: 5.7.27
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `testbadi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Fleets`
--

CREATE TABLE `Fleets` (
  `id` int(11) NOT NULL,
  `fleetName` varchar(255) NOT NULL,
  `rowsSeats` int(2) NOT NULL,
  `columnsSeats` int(1) NOT NULL,
  `acronymSeats` varchar(255) NOT NULL,
  `aisle` int(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Fleets`
--

INSERT INTO `Fleets` (`id`, `fleetName`, `rowsSeats`, `columnsSeats`, `acronymSeats`, `aisle`, `createdAt`, `updatedAt`) VALUES
(2, 'Fleet Badi', 26, 6, 'A,B,C,D,E,F', 3, '2020-01-06 17:08:26', '2020-01-06 17:08:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Flights`
--

CREATE TABLE `Flights` (
  `id` int(11) NOT NULL,
  `flightNumber` int(6) NOT NULL,
  `flightDate` datetime NOT NULL,
  `fleetId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Flights`
--

INSERT INTO `Flights` (`id`, `flightNumber`, `flightDate`, `fleetId`, `createdAt`, `updatedAt`) VALUES
(2, 180320, '2020-03-18 17:09:04', 2, '2020-01-06 17:09:04', '2020-01-06 17:09:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Seats`
--

CREATE TABLE `Seats` (
  `id` int(11) NOT NULL,
  `seatName` varchar(255) NOT NULL,
  `userBook` varchar(255) NOT NULL,
  `bookedDate` datetime NOT NULL,
  `flightId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Fleets`
--
ALTER TABLE `Fleets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Flights`
--
ALTER TABLE `Flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fleetId` (`fleetId`);

--
-- Indices de la tabla `Seats`
--
ALTER TABLE `Seats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `seatName` (`seatName`),
  ADD KEY `flightId` (`flightId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Fleets`
--
ALTER TABLE `Fleets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Flights`
--
ALTER TABLE `Flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Seats`
--
ALTER TABLE `Seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Flights`
--
ALTER TABLE `Flights`
  ADD CONSTRAINT `Flights_ibfk_1` FOREIGN KEY (`fleetId`) REFERENCES `Fleets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Seats`
--
ALTER TABLE `Seats`
  ADD CONSTRAINT `Seats_ibfk_1` FOREIGN KEY (`flightId`) REFERENCES `Flights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

