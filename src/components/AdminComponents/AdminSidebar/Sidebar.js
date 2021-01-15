import React from 'react';
import AccountControl from '../AdminSubComponents/AccountControl';
import EventControl from '../AdminSubComponents/EventControl';
import Verification from '../AdminSubComponents/Verification';

//Material-UI imports
import { Grid, Tabs, Tab } from '@material-ui/core';

import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CreateTimeSlots from '../AdminSubComponents/CreateTimeSlots';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DemographicsControl from '../AdminSubComponents/DemographicsControl';

function SideBar(props) {
  //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Grid container spacing={3}>
      <Grid item lg={2}>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab icon={<AccountCircleIcon />} label="User Management" />
          <Tab icon={<VerifiedUserIcon />} label="New User Verification" />
          <Tab icon={<ShowChartIcon />} label="Demographics" />
          <Tab icon={<CalendarTodayIcon />} label="Event Calendar" />
          <Tab icon={<ScheduleIcon />} label="Create Time Slot" />
        </Tabs>
      </Grid>
      <Grid item lg={10}>
        {selectedTab === 0 && <AccountControl />}
        {selectedTab === 1 && <Verification />}
        {selectedTab === 2 && <DemographicsControl />}
        {selectedTab === 3 && <EventControl />}
        {selectedTab === 4 && <CreateTimeSlots />}
      </Grid>
    </Grid>
  );
}

export default SideBar;
