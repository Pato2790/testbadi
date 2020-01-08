import React, { useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon, Grid, Avatar, Typography } from '@material-ui/core';
import { SidebarStyles } from './SidebarStyles';
import badiImage from '../../assets/images/badi.jpg';

interface SidebarProps {
  openSidebar: boolean;
  setOpenSidebar: (status: boolean) => void;
}

type DrawerSide = 'left';

export const Sidebar: React.FC<SidebarProps> = ({
  openSidebar,
  setOpenSidebar,
}) => {
  const style = SidebarStyles();

  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenSidebar(open);
  };

  const sideList = (side: DrawerSide) => (
    <div
      className={style.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={style.profileSection}
      >
        <Avatar
          alt="Profile Picture"
          src={badiImage}
          className={style.bigAvatar}
        />
        <Typography variant="h5" color="secondary">
          Seats Book Application
        </Typography>
      </Grid>
      <Divider variant="middle" />
      <List>
        {[
          { text: 'Book', icon: 'airline_seat_recline_extra' },
          { text: 'Add Fleet', icon: 'flight_takeoff' },
        ].map(linkItem => (
          <ListItem
            button
            key={linkItem.text}
            classes={{ root: style.linkSize }}
          >
            <ListItemIcon>
              <Icon classes={{ root: style.linkIconSize }}>
                {linkItem.icon}
              </Icon>
            </ListItemIcon>
            <ListItemText
              primary={linkItem.text}
              classes={{
                root: style.linkTextColor,
                primary: style.linkTextSize,
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={openSidebar} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
};
