import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Demographics from '../DemographicsFolder/Demographics';
import ControlPanelDemographics from '../DemographicsFolder/ControlPanelDemographics';
import { Typography } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class DemographicsControl extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VERIFIED_USER_ALL_DETAIL',
    });
  }
  state = {
    heading: 'Verification',
    access_level: 0,
    volunteer_role: 0,
    id: 0,
  };

  render() {
    console.log(this.props.store);
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Demographics
        </Typography>
        <ControlPanelDemographics />
        <Demographics userData={this.props.store.verifiedUserDetailAll} />
      </>
    );
  }
}

export default connect(mapStoreToProps)(DemographicsControl);
