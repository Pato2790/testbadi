import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const UserInfoStyle = makeStyles((theme: Theme) =>
  createStyles({
    mainTextAlign: {
      marginTop: theme.spacing(7),
      marginLeft: theme.spacing(20),
      fontWeight: 'bold',
    },
    bookTextAlign: {
      marginBottom: theme.spacing(5),
    },
    contCenter: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(3),
    },
    contLogin: {
      padding: theme.spacing(3),
      width: '30%',
    },
    inputsMargin: {
      marginBottom: theme.spacing(5),
      width: '60%',
    },
  })
);
