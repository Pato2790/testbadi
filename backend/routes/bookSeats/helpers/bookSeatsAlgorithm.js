let randomSeats = [];

const bookSeatsAlgorithm = (bookedSeats, seatsNumber, fleetColumnsNumber, fleetRowsNumber, fleetAcronymSeats, fleetAisle) => {
  const seatsMap = [];
  randomSeats = [];

  // We can not book seats because the fleet don't have enough places
  if ((fleetRowsNumber * fleetColumnsNumber) - bookedSeats.length < seatsNumber) {
    return []
  }

  // Creating seats map with booked seats
  for (var row = 1; row <= fleetRowsNumber; row++) {
    for (var column = 1; column <= fleetColumnsNumber; column++) {
      const seatName = `${fleetAcronymSeats[column - 1]}${row}`
      seatsMap.push({
        seatName,
        booked: bookedSeats.some((bookedSeat) => {
          return bookedSeat.seatName === seatName
        })
      })
    }
  }

  return checkAllCases(seatsMap, seatsNumber, fleetAisle);
}

// We will check all the cases separately
// We can check all the cases in one array iteration. For it, is necessary make changes in the algorithm
const checkAllCases = (seatsMap, seatsNumber, seatsSectorNumber) => {
  const [resultCase1, seatsCase1] = checkCase1(seatsMap, seatsNumber, seatsSectorNumber);
  if (resultCase1) {
    return seatsCase1
  } else {
    const [resultCase2, seatsCase2] = checkCase2(seatsMap, seatsNumber, seatsSectorNumber);
    if (resultCase2) {
      return seatsCase2
    } else {
      const [resultCase3, seatsCase3] = checkCase3(seatsMap, seatsNumber, seatsSectorNumber);
      if (resultCase3) {
        return seatsCase3
      } else {
        const [resultCase4, seatsCase4] = checkCase4(seatsMap, seatsNumber);
        if (resultCase4) {
          return seatsCase4
        }
      }
    }
  }

  // We did not find any seats combination, but this case is no possible because we check at the beginner
  // if the fleet has enough free seats. It is just a ward.
  return []
}

// For case 2 we need to book all seats in the same fleet side without any balance (without cross the aisle).
// EX1: for seatsNumber = 1 (['A1'] or ['B1'] or ['C1'] or etc...)
// EX2: for seatsNumber = 2 (['A1', 'B1'] or ['B1', 'C1'] or ['D1', 'E1'] or etc...)
// EX3: for seatsNumber = 3 (['A1', 'B1', 'C1'] or ['D1', 'E1', 'F1'])
const checkCase1 = (seatsMap, seatsNumber, seatsSectorNumber) => {
  let seatIndex = 0;
  let possibleSeats = [];
  let seatsSectorIndex;
  let reducedSeatsSectorNumber;

  // If the fleet has 3 seats for sector (['A1', 'B1', 'C1', AISLE, 'D1', 'E1', 'F1']), we can not book 4 or more seats in the same row sector.
  if (seatsNumber > seatsSectorNumber) {
    return [false, []]
  }

  // Start to iterate on most of all seats in the fleet
  while (seatIndex < seatsMap.length) {
    possibleSeats = [];
    seatsSectorIndex = seatIndex;
    reducedSeatsSectorNumber = seatsSectorNumber - seatIndex;

    // We check if we can book N seats in the same sector row
    // This while will finish if found some booked seats and the rest of them in the row are less than the N seats that we want to book.
    while (seatsSectorIndex < seatsSectorNumber && seatsNumber <= reducedSeatsSectorNumber) {
      if (!seatsMap[seatsSectorIndex].booked) {
        possibleSeats.push(seatsMap[seatsSectorIndex].seatName);
        addRandomSeat(seatsMap[seatsSectorIndex].seatName)
      } else {
        reducedSeatsSectorNumber = seatsSectorNumber - (seatIndex + 1);
      }

      // We found N free seats, so we return this seats
      if (seatsNumber === possibleSeats.length) {
        return [true, possibleSeats]
      }

      seatsSectorIndex++;
    }

    // We move the index to the first seat to the next sector row
    seatIndex = seatIndex + seatsSectorNumber
  }

  // We iterated on all seats in the fleet and we didn´t find any sector row to book all the seats.
  return [false, []];
}

// For case 2 we need to balance all seats in the same fleet side (without cross the aisle).
// EX1: for seatsNumber = 6, we should have rows = 2 and columns = 3 (['A1', 'B1', 'C1', 'A2', 'B2', 'C2'])
// EX2: for seatsNumber = 5, we should have rows = 5 and columns = 1 (['A1', 'A2', 'A3', 'A4', 'A5'])
// EX3: for seatsNumber = 4, we should have rows = 2 and columns = 2 (['A1', 'B1', 'A2', 'B2'])
const checkCase2 = (seatsMap, seatsNumber, seatsSectorNumber) => {
  let seatIndex = 0;
  let firstSeatIndex = 0;
  let possibleSeats;
  let isBalanced = false;
  let balanceNumber = seatsSectorNumber;
  let balanceRows = 0;

  // Calculate the rows and columns to balance the seats
  while (!isBalanced) {
    isBalanced = seatsNumber % balanceNumber === 0;
    if (isBalanced) {
      balanceRows = seatsNumber / balanceNumber;
    } else {
      balanceNumber--;
    }
  }

  // Start to iterate on most of all seats in the fleet
  while (seatIndex < seatsMap.length) {
    possibleSeats = [];

    // I can´t continue checking for free places, because we can´t balance the seats with the required N rows
    const possibleFleetOverflow = seatIndex + ((balanceRows - 1) * seatsSectorNumber * 2);
    if (possibleFleetOverflow >= seatsMap.length) {
      return [false, []];
    }

    // Try to find some free seats
    for (let col = 0; col < balanceNumber; col++) {
      for (let row = 0; row < balanceRows; row++) {
        const mappedIndex = seatIndex + col + (seatsSectorNumber * 2 * row);
        if (!seatsMap[mappedIndex].booked) {
          possibleSeats.push(seatsMap[mappedIndex].seatName);
          addRandomSeat(seatsMap[mappedIndex].seatName)
        }
      }
    }

    // We found N free seats, so we return this seats
    if (possibleSeats.length === seatsNumber) {
      return [true, possibleSeats]
    } else {
      // We check if there are enough seats to continue checking if we can book seats in this row
      const newSeatsSectorNumber = seatsSectorNumber - (seatIndex + 1);
      if (balanceNumber > newSeatsSectorNumber) {
        seatIndex = firstSeatIndex = firstSeatIndex + seatsSectorNumber
      } else {
        seatIndex++;
      }
    }
  }
}

// For case 3, we only need to iterate on seats close to the aisle (EX: [C1, D1], [C2, D2]). This is because the others cases have been checked
// in the last cases
const checkCase3 = (seatsMap, seatsNumber, seatsSectorNumber) => {
  let balanceRows = seatsNumber / 2;
  let seatIndex = seatsSectorNumber - 1;
  let possibleSeats;

  // If the required seats to book are odd, we can not balance the seats.
  // EX1: for seatsNumber = 5, we should have rows = 3 and columns = 2 (['C1', 'D1', 'C2', 'D2', 'C3'])
  if (seatsNumber % 2 !== 0) {
    return [false, []];
  }

  // Start to iterate on most of all seats in the fleet
  while (seatIndex < seatsMap.length) {
    possibleSeats = [];

    // I can´t continue checking for free places, because we can´t balance the seats in the required rows
    const possibleFleetOverflow = seatIndex + (balanceRows * seatsSectorNumber * 2);
    if (possibleFleetOverflow >= seatsMap.length) {
      return [false, []];
    }

    // Try to find some free seats close to the aisle balanced by N rows
    for (let row = 0; row < balanceRows; row++) {
      const mappedIndex = seatIndex + (seatsSectorNumber * 2 * row);
      if (!seatsMap[mappedIndex].booked) {
        possibleSeats.push(seatsMap[mappedIndex].seatName);
        addRandomSeat(seatsMap[mappedIndex].seatName);
      }
      if (!seatsMap[mappedIndex + 1].booked) {
        possibleSeats.push(seatsMap[mappedIndex + 1].seatName);
        addRandomSeat(seatsMap[mappedIndex + 1].seatName);
      }
    }

    // We found N free seats, so we return this seats
    if (possibleSeats.length === seatsNumber) {
      return [true, possibleSeats]
    } else {
      // Move the index to the seats row below
      seatIndex = seatIndex + (seatsSectorNumber * 2);
    }
  }
}

// We was storing the free seats in a new array called randomSeats
// We need to check if we stored enough free seats
// Else, we need to iterate all seats
const checkCase4 = (seatsMap, seatsNumber) => {

  // We found enough free seats when we checked the other cases
  if (randomSeats.length >= seatsNumber) {
    return [true, randomSeats.slice(0, seatsNumber)]
  } else {
    // We did not find enough free seats, so we need to iterate the seatsMap
    const randomBookedSeats = [];
    let seatIndex = 0;

    while (seatIndex < seatsMap.length && randomBookedSeats.length < seatsNumber) {
      if (!seatsMap[seatIndex].booked) {
        randomBookedSeats.push(seatsMap[seatIndex].seatName);
      }
      seatIndex++;
    }

    // We found enough random seats to book
    if (randomBookedSeats.length === seatsNumber) {
      return [true, randomBookedSeats]
    } else {
      // This case will never happen because we check if the fleet has enough free seats. It is just a ward.
      return [false, []]
    }
  }
}

// Helper function to save the random seats in a global array.
const addRandomSeat = (possibleSeat) => {
  const hasNotSeat = !randomSeats.includes(possibleSeat)
  if (hasNotSeat) { randomSeats.push(possibleSeat) }
}

module.exports = bookSeatsAlgorithm;
