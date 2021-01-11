import React from 'react';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

//Material-UI imports
import { Tabs, Tab, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

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

      {selectedTab === 0 && <RegisterForm />}
      {selectedTab === 1 && <Typography>Calendar</Typography>}
      {selectedTab === 2 && <Typography>Permissions</Typography>}
      {selectedTab === 3 && <Typography>Statistics</Typography>}
      <div>
        <ImageUpload />
        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  );
}
