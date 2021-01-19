import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//custom file imports
import UserManagement from '../UserManagement/UserManagement';

//material ui imports
import { Typography } from '@material-ui/core';

class AccountControl extends Component {
  render() {
    return (
      <div className="adminPageDisplay">
        <Typography variant="h4" gutterBottom>
          Verified users
        </Typography>
        <UserManagement userData={this.props.store.verifiedUserDetailAll} />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AccountControl);
