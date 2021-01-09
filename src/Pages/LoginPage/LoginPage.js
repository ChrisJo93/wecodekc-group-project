import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom file imports
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterTab from '../../components/RegisterTab/RegisterTab';

//Need to select mentor or volunteer and display page based on selection
//Need to redirect to login once form is complete

//Material-UI imports
import { Tabs, Tab, Grid } from '@material-ui/core';

function LoginPage(props) {
  // //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="log-in" />
            <Tab label="register" />
          </Tabs>

          {selectedTab === 0 && <LoginForm />}
          {selectedTab === 1 && <RegisterTab />}
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(LoginPage);
