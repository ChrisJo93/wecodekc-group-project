import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ControlPanelAccountControl extends Component {
  render() {
    const array = [1, 2, 3, 4, 5];
    const details = this.props.store.verifiedUserDetailReducer;
    return details.length > 0 ? (
      <div>
        <Grid container>
          <Grid item lg={2}>
            <h2>User</h2>
          </Grid>
          <Grid item lg={2}>
            <h2>Skills</h2>
          </Grid>
          <Grid item lg={2}>
            <h2>Education</h2>
          </Grid>
          <Grid item lg={6}>
            <h2>Notes</h2>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={2}>
            <p>
              <span>Last Name: </span>
              {details[0].last_name}
            </p>
            <p>Volunteer Role: {details[0].role_label}</p>
            <p>Phone: {details[0].phone_number}</p>
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
          <Grid item lg={6}>
            <ul>
              {details[0].admin_note_array.map((element) => (
                <li>{element}</li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </div>
    ) : (
      <div>
        <h1>Select a user to get details</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanelAccountControl);
