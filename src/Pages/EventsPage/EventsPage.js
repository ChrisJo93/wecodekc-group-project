import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return <div></div>;
  }
}

export default connect(mapStoreToProps)(LandingPage);
