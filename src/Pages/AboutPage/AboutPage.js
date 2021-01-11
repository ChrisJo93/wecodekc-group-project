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
  Box,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

export default function AboutPage() {
  //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="container">
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={handleTabChange}
      >
        <Tab icon={<AccountCircleIcon />} label="All Users" />
        <Tab icon={<CalendarTodayIcon />} label="Calendar" />
        <Tab icon={<VerifiedUserIcon />} label="Permissions" />
        <Tab icon={<ShowChartIcon />} label="Statistics" />
      </Tabs>

      {selectedTab === 0 && <Typography>All Users</Typography>}
      {selectedTab === 1 && <Typography>Calendar</Typography>}
      {selectedTab === 2 && <Typography>Permissions</Typography>}
      {selectedTab === 3 && <Typography>Statistics</Typography>}
      <div>
        {/* <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          containerStyle={{ height: 'calc(100% - 64px)', top: 64 }}
        >
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
        </Drawer> */}
        <ImageUpload />
        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  );
}
