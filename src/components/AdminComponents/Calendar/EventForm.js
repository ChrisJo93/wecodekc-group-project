import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EventForm extends Component {
  state = {
    heading: 'Hi, Im the event form',
    add: 'https://image.flaticon.com/icons/png/512/42/42953.png',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <img src={this.state.add} onClick={console.log('I do something')} />
        <button onClick={this.props.showForm}>lol</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventForm);
