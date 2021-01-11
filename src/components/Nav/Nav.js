import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ position: 'static', left: 0, top: 0 }}>
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
            <Link className="nav-link" to={loginLinkData.path}>
              {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
              {loginLinkData.text}
            </Link>
            {/* Show the link to the info page and the logout button if the user is logged in */}
            {props.store.user.id && (
              <>
                <Link className="nav-link" to="/info">
                  Info Page
                </Link>
                <LogOutButton className="nav-link" />
              </>
            )}
            {/* Always show this link since the about page is not protected */}
            <Link className="nav-link" to="/about">
              About
            </Link>
            <Link className="nav-link" to="/events">
              Events
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
