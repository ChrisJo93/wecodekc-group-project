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
    const details = this.props.store.newUserDetailReducer;
    return details.length > 0 ? (
      <div>
        <Grid container>
          <Grid item lg={3}>
            <Typography variant="h6">Personal Details</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography variant="h6">Experience</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography variant="h6">Motivation</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography variant="h6">Skills</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography variant="h6">Education</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={3}>
            <Typography>
              {details[0].first_name} {details[0].last_name}
            </Typography>
            <Typography>Company: {details[0].company}</Typography>
            <Typography>Job Title: {details[0].job_title}</Typography>
            {details[0].phone_number && (
              <Typography>Phone: {details[0].phone_number}</Typography>
            )}
          </Grid>
          <Grid item lg={2}>
            <Typography>{details[0].experience_bio}</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography>{details[0].motivation_bio}</Typography>
          </Grid>
          <Grid item lg={2}>
            {details[0].skills_label_array.map((element) => (
              <Typography>{element}</Typography>
            ))}
          </Grid>
          <Grid item lg={2}>
            <Typography>{details[0].education_label}</Typography>
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
