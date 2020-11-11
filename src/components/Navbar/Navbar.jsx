import React from 'react';
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import { useGlobalStateValue } from '../../context/GlobalState';
import useStyles from './Navbar.styles';

const Navbar = () => {
  const [{ user, logout }] = useGlobalStateValue();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Gamblr
          </Typography>
          {user?.email && (
            <>
              <Typography variant="body2" className={classes.user}>
                {user.email}
              </Typography>
              <PersonIcon onClick={handleClick} className={classes.icon} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
