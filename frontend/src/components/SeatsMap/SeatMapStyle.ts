import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const SeatMapStyle = makeStyles((theme: Theme) =>
  createStyles({
    contSeats: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      width: '60%',
    },
    bookedSeat: {
      backgroundColor: theme.palette.secondary.light,
    },
    newBookedSeat: {
      backgroundColor: theme.palette.primary.light,
    },
    mainTextAlign: {
      marginTop: theme.spacing(7),
      marginLeft: theme.spacing(20),
      fontWeight: 'bold',
    },
    mainSubTextAlign: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(20),
    },
  })
);
