import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';

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
        <h2>{this.state.heading}</h2>
        <Grid item lg={3}>
          <p>User: {details[0].last_name}</p>
          <p>Company: {details[0].company}</p>
          <p>Job_title: {details[0].job_title}</p>
          <p>Phone: {details[0].phone_number}</p>
          <p>Experience: {details[0].experience_bio}</p>
          <p>Motivation: {details[0].motivation_bio}</p>
        </Grid>
      </Grid>
    ) : (
      <div>
        <h1>Select a user to get details</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanel);
