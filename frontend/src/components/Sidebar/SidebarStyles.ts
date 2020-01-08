import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const SidebarStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileSection: {
      marginBottom: theme.spacing(2),
    },
    list: {
      width: 300,
    },
    fullList: {
      width: 'auto',
    },
    bigAvatar: {
      margin: 10,
      width: 200,
      height: 200,
    },
    linkTextColor: {
      color: theme.palette.secondary.main,
    },
    linkIconSize: {
      fontSize: '2.2rem',
    },
    linkSize: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    linkTextSize: {
      fontSize: '20px',
    },
    subLinksTextColor: {
      color: theme.palette.grey[500],
    },
    subLinkFontSize: {
      fontSize: '14px',
    },
    subLinkTextHelp: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  })
);
