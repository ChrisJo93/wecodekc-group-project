import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//custom file imports
import Verify from '../../../components/AdminComponents/VerificationTable/Verify';
import { Typography } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class Verification extends Component {
  state = {
    heading: 'Verification',
    access_level: 0,
    volunteer_role: 0,
    id: 0,
  };

  render() {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Applicants
        </Typography>
        <Verify userData={this.props.store.unverifiedUsers} />
      </>
    );
  }
}

export default connect(mapStoreToProps)(Verification);
