import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//material-ui imports
import { Typography, Grid } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ControlPanelVerification extends Component {
  render() {
    const array = [1, 2, 3, 4, 5];
    const details = this.props.store.newUserDetailReducer;
    return details.length > 0 ? (
      <div>
        <Grid container>
          <Grid item lg={2}>
            <Typography>Personal Details</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Experience</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Motivation</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Skills</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Education</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={2}>
            <Typography>Last Name: {details[0].last_name}</Typography>
            <Typography>Company: {details[0].company}</Typography>
            <Typography>Job Title: {details[0].job_title}</Typography>
            <Typography>Phone: {details[0].phone_number}</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Experience: {details[0].experience_bio}</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>Motivation: {details[0].motivation_bio}</Typography>
          </Grid>
          <Grid item lg={2}>
            <ul>
              {details[0].skills_label_array.map((element) => (
                <li>{element}</li>
              ))}
            </ul>
          </Grid>
          <Grid item lg={2}>
            <ul>{details[0].education_label}</ul>
          </Grid>
        </Grid>
      </div>
    ) : (
      <div>
        <Typography>Select a user to get details</Typography>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanelVerification);
