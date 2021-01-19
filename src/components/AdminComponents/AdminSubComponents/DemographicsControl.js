import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Demographics from '../DemographicsFolder/Demographics';
import ControlPanelDemographics from '../DemographicsFolder/ControlPanelDemographics';
import { Typography } from '@material-ui/core';
import axios from 'axios';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class DemographicsControl extends Component {
  state = {
    selection: 1,
    demoData: [],
  };
  componentDidMount() {
    let demoData;
    switch (this.state.selection) {
      case 1:
        demoData = axios.get(`api/demographics/user/${1}`);
        this.setState({
          demoData: demoData,
        });
        break;
      case 2:
        demoData = axios.get(`api/demographics/user/${2}`);
        this.setState({
          demoData: demoData,
        });
        break;
      case 3:
        demoData = axios.get(`api/demographics/user/${3}`);
        this.setState({
          demoData: demoData,
        });
        break;
      default:
        demoData = axios.get(`api/demographics/user/${1}`);
        this.setState({
          demoData: demoData,
        });
        break;
    }
  }

  callback(selection) {
    this.setState({
      ...this.state,
      selection: selection,
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
        <Typography variant="h4" gutterBottom>
          Demographics
        </Typography>
        <ControlPanelDemographics />
        <Demographics callback={this.callback} userData={this.state.demoData} />
      </>
    );
  }
}

export default connect(mapStoreToProps)(DemographicsControl);
