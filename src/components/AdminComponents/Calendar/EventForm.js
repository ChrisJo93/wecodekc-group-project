import { Avatar, Dialog, List, ListItemAvatar } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { AddCircle } from '@material-ui/icons';
import axios from 'axios';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EventForm extends Component {
  state = {
    heading: 'Hi, Im the event form',
  };

  componentDidMount() {
    axios
      .get('/api/user/all')
      .then((response) => {
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error, 'wtf');
      });
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <button onClick={this.props.showForm}>lol</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventForm);
