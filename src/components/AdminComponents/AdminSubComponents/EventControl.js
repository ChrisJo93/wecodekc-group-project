import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from '../../../components/AdminComponents/Calendar/Calendar';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//Material-UI imports
import { Typography } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EventControl extends Component {
  render() {
    return (
      <div className="adminPageDisplay">
        <Typography variant="h4" gutterBottom>
          Calendar
        </Typography>
        <Calendar />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventControl);
