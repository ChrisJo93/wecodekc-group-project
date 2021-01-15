import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Demographics from '../DemographicsFolder/Demographics';
import ControlPanelDemographics from '../DemographicsFolder/ControlPanelDemographics';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class DemographicsControl extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_ID',
    });
  }
  state = {
    heading: 'Verification',
    access_level: 0,
    volunteer_role: 0,
    id: 0,
  };

  render() {
    return (
      <>
        <ControlPanelDemographics />
        <Demographics userData={this.props.store.allUsers} />
      </>
    );
  }
}

export default connect(mapStoreToProps)(DemographicsControl);
