import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) =>
  createStyles({
    app: {
      [theme.breakpoints.down('sm')]: {
        height: '75px',
      },
    },
  });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = (props) => {
  let loginLinkData = {
    path: '/login-register',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        style={{ position: 'static', left: 0, top: 0 }}
        className={props.classes.app}
      >
        <Toolbar>
          <Link to="/home" className={classes.title}>
            <Typography
              edge="start"
              variant="h4"
              component="h2"
              className="nav-title"
            >
              WeCodeKC
            </Typography>
          </Link>
          <div className="nav-right">
            {/* <IconButton onClick={handleClick} edge="start">
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Login/Register</MenuItem>
              <MenuItem onClick={handleClose}>Events</MenuItem>

              {props.store.user.access_level_id === 4 && (
                <MenuItem onClick={handleClose}>Admin</MenuItem>
              )}
            </Menu> */}
            <Link className="nav-link" to={loginLinkData.path}>
              {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
              {loginLinkData.text}
            </Link>
            {/* Show the link to the info page and the logout button if the user is logged in */}
            {props.store.user.id && (
              <>
                <LogOutButton className="nav-link" />
              </>
            )}
            {/* Always show this link since the about page is not protected */}

            <Link className="nav-link" to="/events">
              Events
            </Link>

            {props.store.user.access_level === 4 && (
              <>
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </>
            )}
            {props.store.user.access_level === 5 && (
              <>
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStoreToProps)(withStyles(muiStyles)(Nav));
