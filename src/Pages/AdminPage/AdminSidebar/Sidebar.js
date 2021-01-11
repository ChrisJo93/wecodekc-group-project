import React from 'react';
import AccountControl from '../AdminSubComponents/AccountControl';
import EventControl from '../AdminSubComponents/EventControl';
import Statistics from '../AdminSubComponents/Statistics';
import Verification from '../AdminSubComponents/Verification';
import Welcome from '../AdminSubComponents/Welcome';

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

function SideBar() {
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
        <Tab icon={<AccountCircleIcon />} label="Account Control" />
        <Tab icon={<CalendarTodayIcon />} label="Event Calendar" />
        <Tab icon={<ShowChartIcon />} label="Verification" />
        <Tab icon={<VerifiedUserIcon />} label="Statistics" />
      </Tabs>

      {selectedTab === 0 && <AccountControl />}
      {selectedTab === 1 && <EventControl />}
      {selectedTab === 2 && <Verification />}
      {selectedTab === 3 && <Statistics />}
    </div>
  );
}

export default SideBar;
