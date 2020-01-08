import React, { useState, useEffect } from 'react';
import { SeatsInfo } from '../../types/SeatsInfo';
import {
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from '@material-ui/core';
import { Seat } from '../../types/Seat';
import { SeatMapStyle } from './SeatMapStyle';

export interface SeatsMapProps {
  seatsInfo: SeatsInfo | undefined;
}

export const SeatsMap: React.FC<SeatsMapProps> = ({ seatsInfo }) => {
  const classes = SeatMapStyle();

  const [seats, setSeats] = useState<Seat[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(true);

  useEffect(() => {
    createSeatsMap();
  }, []);

  const createSeatsMap = () => {
    if (seatsInfo) {
      const seatsMap: Seat[] = [];
      for (var row = 1; row <= seatsInfo.rows; row++) {
        for (var column = 1; column <= seatsInfo.columns.cantSeats; column++) {
          const seatID = `${seatsInfo.columns.acronymSeats[column - 1]}${row}`;
          seatsMap.push({
            seatID: seatID,
            booked: seatsInfo.bookedSeats.some(bookedSeat => {
              return bookedSeat === seatID;
            }),
          });
        }
      }
      setSeats(seatsMap);
    }
  };

  const setColorSeat = (seat: Seat): string => {
    const isNewSeat =
      seatsInfo && seatsInfo.newBookedSeats.includes(seat.seatID);

    if (isNewSeat) {
      return classes.newBookedSeat;
    } else if (seat.booked) {
      return classes.bookedSeat;
    }

    return '';
  };

  return (
    <>
      <Typography
        variant="h3"
        color="primary"
        classes={{ root: classes.mainTextAlign }}
      >
        Congrats!
      </Typography>
      <Typography
        variant="h5"
        color="primary"
        classes={{ root: classes.mainSubTextAlign }}
      >
        You've booked the seats!
      </Typography>
      <Typography variant="h4" align="center">
        Front
      </Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={3}
          classes={{ root: classes.contSeats }}
        >
          {seats &&
            seats.map((seat, index) => {
              return (
                <Grid item sm={2} xs={2} md={2} lg={2} spacing={3} key={index}>
                  <Paper
                    variant="outlined"
                    square
                    className={setColorSeat(seat)}
                  >
                    <Typography
                      variant="subtitle2"
                      align="center"
                      style={{ padding: '2%' }}
                    >
                      {seat.seatID}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </Grid>

      <Dialog
        open={showSuccessDialog}
        aria-labelledby="full-fleet-title"
        aria-describedby="full-fleet-dialog-description"
      >
        <DialogTitle id="full-fleet-dialog-title">Success!</DialogTitle>
        <DialogContent>
          <DialogContentText id="full-fleet-dialog-description">
            <Typography align="center" variant="subtitle1">
              <b>Congratulations!</b> You've booked you seats successfully. If
              you have some problems with the seats, please contact with
              support area.
              <br />
              <br />
              The seats you booked are:
              <br />
              <b>{seatsInfo && seatsInfo.newBookedSeats.toString()}</b>
              <br />
              <br />
              Enjoy your trip!
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={e => {
              setShowSuccessDialog(false);
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
