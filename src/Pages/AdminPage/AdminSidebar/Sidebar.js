import React from 'react';
import AccountControl from '../AdminSubComponents/AccountControl';
import EventControl from '../AdminSubComponents/EventControl';
import Statistics from '../AdminSubComponents/Statistics';
import Verification from '../AdminSubComponents/Verification';

//Material-UI imports
import { Grid, Tabs, Tab, Typography } from '@material-ui/core';
<<<<<<< HEAD
=======
import { makeStyles } from '@material-ui/core/styles';
>>>>>>> develop
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CreateTimeSlots from '../AdminSubComponents/CreateTimeSlots';
import ScheduleIcon from '@material-ui/icons/Schedule';

function SideBar(props) {
  //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
<<<<<<< HEAD
    <Grid container spacing={3}>
      <Grid item lg={3}>
=======
    <Grid container>
      <Grid item lg={2}>
>>>>>>> develop
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab icon={<AccountCircleIcon />} label="Account Control" />
<<<<<<< HEAD
          <Tab icon={<CalendarTodayIcon />} label="Event Calendar" />
          <Tab icon={<ShowChartIcon />} label="Verification" />
          <Tab icon={<VerifiedUserIcon />} label="Statistics" />
        </Tabs>
      </Grid>
      <Grid item lg={9}>
        {selectedTab === 0 && <AccountControl />}
        {selectedTab === 1 && <EventControl />}
        {selectedTab === 2 && <Verification />}
        {selectedTab === 3 && <Statistics />}
=======
          <Tab icon={<VerifiedUserIcon />} label="New User Verification" />
          <Tab icon={<ShowChartIcon />} label="Demographics" />
          <Tab icon={<CalendarTodayIcon />} label="Event Calendar" />
          <Tab icon={<ScheduleIcon />} label="Create Time Slot" />
        </Tabs>
      </Grid>
      <Grid item lg={10}>
        {selectedTab === 0 && <AccountControl />}
        {selectedTab === 1 && <Verification />}
        {selectedTab === 2 && <Statistics />}
        {selectedTab === 3 && <EventControl />}
        {selectedTab === 4 && <CreateTimeSlots />}
>>>>>>> develop
      </Grid>
    </Grid>
  );
}

export default SideBar;
