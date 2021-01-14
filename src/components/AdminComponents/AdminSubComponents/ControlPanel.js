import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ControlPanel extends Component {
  state = {
    heading: 'Control Panel',
  };

  render() {
    const details = this.props.store.userDetailReducer;
    return details.length > 0 ? (
      <div>
        <h2>{this.state.heading}</h2>
        <h3>User: {details[0].first_name}</h3>
        <h3>Phone:{details[0].phone_number}</h3>
        <h3>hello</h3>
        <h3>hello</h3>
      </div>
    ) : (
      <div>
        <h1>Select a user to get details</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanel);
