import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Icon, Hidden, Typography } from '@material-ui/core';
import { NavbarStyles } from './NavbarStyles';

interface NavbarProps {
  setOpenSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setOpenSidebar }) => {
  const classes = NavbarStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={e => setOpenSidebar()}
          >
            <Icon classes={{ root: classes.linkIconSize }}>menu</Icon>
          </IconButton>
          <div className={classes.grow} />
          <Typography variant="h3" style={{ fontWeight: 'bold' }}>
            badi
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
};
