import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Calendar from '../../components/AdminComponents/Calendar/Calendar';

class AdminPage extends Component {
  state = {
    heading: 'Admin Page',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <Calendar />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
