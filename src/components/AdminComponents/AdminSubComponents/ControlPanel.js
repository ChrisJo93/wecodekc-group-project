import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//Material-UI imports
import { Typography, Grid } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ControlPanel extends Component {
  state = {
    heading: 'Control Panel',
  };

  render() {
    const details = this.props.store.userDetailReducer;
    return details.length > 0 ? (
      <Grid container>
        <Typography variant="h4">{this.state.heading}</Typography>
        <Grid item lg={3}>
          <Typography>User: {details[0].last_name}</Typography>
          <Typography>Company: {details[0].company}</Typography>
          <Typography>Job_title: {details[0].job_title}</Typography>
          <Typography>Phone: {details[0].phone_number}</Typography>
          <Typography>Experience: {details[0].experience_bio}</Typography>
          <Typography>Motivation: {details[0].motivation_bio}</Typography>
        </Grid>
      </Grid>
    ) : (
      <div>
        <Typography variant="h4" gutterBottom>
          Select a user to get details
        </Typography>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanel);
