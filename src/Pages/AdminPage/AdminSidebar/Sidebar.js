import React from 'react';
import AccountControl from '../AdminSubComponents/AccountControl';
import EventControl from '../AdminSubComponents/EventControl';
import Statistics from '../AdminSubComponents/Statistics';
import Verification from '../AdminSubComponents/Verification';

//Material-UI imports
import { Grid, Tabs, Tab, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    <Grid container>
      <Grid item lg={2}>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab icon={<AccountCircleIcon />} label="Account Control" />
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
      </Grid>
    </Grid>
  );
}

export default SideBar;
