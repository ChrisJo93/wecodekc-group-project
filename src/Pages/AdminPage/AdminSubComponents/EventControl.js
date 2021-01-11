import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from '../../../components/AdminComponents/Calendar/Calendar';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EventControl extends Component {
  state = {
    heading: 'Event Control',
  };

  render() {
    return (
      <div className="adminPageDisplay">
        <h2>{this.state.heading}</h2>
        <Calendar />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventControl);
