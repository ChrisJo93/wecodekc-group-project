import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Verify from '../../../components/AdminComponents/VerificationTable/Verify';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Verification extends Component {
  state = {
    heading: 'Verification',
  };

  render() {
    return <Verify />;
  }
}

export default connect(mapStoreToProps)(Verification);
