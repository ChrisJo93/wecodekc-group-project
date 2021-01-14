import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import UserManagement from '../UserManagement/UserManagement';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AccountControl extends Component {
  state = {
    heading: 'Account Control',
  };

  render() {
    return (
      <div className="adminPageDisplay">
        <UserManagement userData={this.props.store.allUsers} />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AccountControl);
