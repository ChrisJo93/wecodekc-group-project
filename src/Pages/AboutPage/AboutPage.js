import React from 'react';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

//Material-UI imports
import {
  Drawer,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function AboutPage() {
  const classes = useStyles();

  return (
    <div className="container">
      <div>
        <Drawer className={classes.drawer} variant="permanent" anchor="left">
          <div />
          <Divider />
          <List>
            {['All Users', 'Calendar', 'Permissions', 'Statistics'].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index === 0 && <AccountCircleIcon />}
                    {index === 1 && <CalendarTodayIcon />}
                    {index === 2 && <VerifiedUserIcon />}
                    {index === 3 && <ShowChartIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Drawer>
        <ImageUpload />

        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  );
}
