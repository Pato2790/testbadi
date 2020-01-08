import React, { useState, useEffect } from 'react';
import { BookInfo } from '../../types/BookInfo';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { UserInfoStyle } from './UserInfoStyle';
import { SeatsInfo } from '../../types/SeatsInfo';
import { bookSeatsPost } from '../../api/bookSeats/bookSeatsPost';
import { flightsGet } from '../../api/flights/flightsGet';
import { FlightInfo } from '../../types/FlightInfo';

export interface UserInfoProps {
  onBookStepChange: (bookStep: string) => void;
  onUserBookSeat: (bookedSeats: SeatsInfo) => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  onBookStepChange,
  onUserBookSeat,
}) => {
  const classes = UserInfoStyle();

  const [userInfo, setUserInfo] = useState<BookInfo>({
    firstName: '',
    lastName: '',
    seatsNumber: 0,
  });

  const [allFlights, setAllFlights] = useState<FlightInfo[]>([]);
  const [fullFleetMessage, setFullFleetMessage] = useState<boolean>(false);

  useEffect(() => {
    flightsGet().then(data => {
      setAllFlights(data);
    });
  }, []);

  const bookSeats = () => {
    bookSeatsPost(userInfo)
      .then(response => {
        if (response.canBook) {
          onUserBookSeat(response);
          onBookStepChange('seatsMap');
        } else {
          setFullFleetMessage(true);
        }
      })
      .catch(err => {
        console.error('Api Response Error: ', err);
      });
  };

  return (
    <>
      <Typography
        variant="h3"
        color="primary"
        align="left"
        classes={{ root: classes.mainTextAlign }}
      >
        Book Your Seats!
      </Typography>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        classes={{ root: classes.contCenter }}
      >
        <Paper classes={{ root: classes.contLogin }}>
          <Typography
            variant="h4"
            color="secondary"
            align="left"
            classes={{ root: classes.bookTextAlign }}
          >
            Book Information
          </Typography>
          <Grid
            container
            item
            direction="column"
            justify="center"
            alignItems="center"
          >
            <div className={classes.inputsMargin}>
              <InputLabel id="flights">Flight Number</InputLabel>
              <Select
                labelId="flights"
                id="flights-select"
                value={userInfo.flightNumber}
                onChange={e => {
                  userInfo.flightNumber = parseInt(e.target.value as string);
                  setUserInfo(userInfo);
                }}
                style={{ width: '100%' }}
              >
                {allFlights.map((flight, index) => {
                  return (
                    <MenuItem value={flight.flightNumber} key={index}>
                      {flight.flightNumber}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <TextField
              id="firstName"
              label="First Name"
              onChange={e => {
                userInfo.firstName = e.currentTarget.value;
                setUserInfo(userInfo);
              }}
              classes={{ root: classes.inputsMargin }}
            />
            <TextField
              id="lastName"
              label="Last Name"
              onChange={e => {
                userInfo.lastName = e.currentTarget.value;
                setUserInfo(userInfo);
              }}
              classes={{ root: classes.inputsMargin }}
            />
            <TextField
              id="seatsNumber"
              label="Seats Number"
              type="number"
              helperText="Max seats: 8 per person"
              onChange={e => {
                userInfo.seatsNumber = parseInt(e.currentTarget.value);
                setUserInfo(userInfo);
              }}
              classes={{ root: classes.inputsMargin }}
            />
            <Button variant="contained" color="primary" onClick={bookSeats}>
              Book
            </Button>
          </Grid>
        </Paper>
      </Grid>

      <Dialog
        open={fullFleetMessage}
        aria-labelledby="full-fleet-title"
        aria-describedby="full-fleet-dialog-description"
      >
        <DialogTitle id="full-fleet-dialog-title">Information</DialogTitle>
        <DialogContent>
          <DialogContentText id="full-fleet-dialog-description">
            The fleet that you try to book the seats are full. Please, try to
            book in another fleet.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={e => {
              setFullFleetMessage(false);
            }}
            color="primary"
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
