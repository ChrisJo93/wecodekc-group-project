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
  state = {};

  callback = (selection) => {
    switch (selection) {
      case 1:
        this.props.dispatch({
          type: 'GET_SELECTION_DEMOGRAPHICS',
          payload: 1,
        });
        this.props.dispatch({
          type: 'SET_VOLUNTEER',
          payload: 1,
        });
        this.setState({
          selection: selection,
        });
        break;
      case 2:
        this.props.dispatch({
          type: 'GET_SELECTION_DEMOGRAPHICS',
          payload: 2,
        });
        this.props.dispatch({
          type: 'SET_GENDER',
          payload: 1,
        });
        this.setState({
          selection: selection,
        });
        break;
      case 3:
        this.props.dispatch({
          type: 'GET_SELECTION_DEMOGRAPHICS',
          payload: 3,
        });
        this.props.dispatch({
          type: 'GET_GRAPH_ETHNICITY',
          payload: 1,
        });
        this.setState({
          selection: selection,
        });
        break;
      default:
        console.log('error');
        break;
    }
  };

  render() {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Demographics
        </Typography>
        <ControlPanelDemographics
          callback={this.callback}
          selection={this.state.selection}
        />
        <Demographics userData={this.props.store.demographicsSelection} />
      </>
    );
  }
}

export default connect(mapStoreToProps)(DemographicsControl);
