import React, { useState } from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import { SeatsMap } from '../SeatsMap/SeatsMap';
import { SeatsInfo } from '../../types/SeatsInfo';

export const BookSeatManager: React.FC = () => {
  const [bookStep, setBookStep] = useState<string>('userInfo');
  const [seatsInfoResponse, setSeatsInfoResponse] = useState<SeatsInfo>();

  /* 
  {
    columns: {
      aisle: 3,
      cantSeats: 6,
      acronymSeats: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
    rows: 26,
    canBook: true,
    bookedSeats: [],
    newBookedSeats: ['A1', 'B2']
  }
  */

  return (
    <>
      {/*Conditions to change the views when users make some book seats */}
      {bookStep === 'userInfo' && (
        <UserInfo
          onBookStepChange={setBookStep}
          onUserBookSeat={setSeatsInfoResponse}
        />
      )}

      {bookStep === 'seatsMap' && <SeatsMap seatsInfo={seatsInfoResponse} />}
    </>
  );
};
