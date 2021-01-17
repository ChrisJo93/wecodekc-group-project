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
    menuButton: {
      marginRight: theme.spacing(2),
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

  let adminData = {
    path: '/admin',
    text: 'Admin',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  if (props.store.user.access_level === 4 || 5) {
    adminData.path = '/admin';
    adminData.text = 'Admin';
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
            <div className={props.classes.menuButton}>
              <IconButton onClick={handleClick} edge="start">
                <MenuIcon />
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                {' '}
                <Link
                  className="nav-link"
                  to={loginLinkData.path}
                  style={{ minWidth: 100 }}
                >
                  {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
                  {loginLinkData.text}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className="nav-link"
                  to="/events"
                  style={{ minWidth: 100 }}
                >
                  Events
                </Link>
              </MenuItem>
              {props.store.user.access_level >= 4 && (
                <MenuItem>
                  {' '}
                  <Link
                    className="nav-link"
                    to="/admin"
                    style={{ minWidth: 100 }}
                  >
                    Admin
                  </Link>
                </MenuItem>
              )}
              <MenuItem>
                {' '}
                {props.store.user.id && (
                  <>
                    <LogOutButton className="nav-link" />
                  </>
                )}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStoreToProps)(withStyles(muiStyles)(Nav));
