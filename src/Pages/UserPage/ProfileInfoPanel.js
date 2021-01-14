import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom MATERIAL-UI imports
import { Button, Typography } from '@material-ui/core';

class ProfileInfoPanel extends Component {
  render() {
    return (
      <div>
        <div>
          {/* TODO - CONDITIONAL RENDER PROFILE PIC IF IMAGE EXISTS */}
          {/* {this.props.store.userReducer.image_link } */}
          <img
            src={
              'https://wecodekc.s3.us-east-2.amazonaws.com/default-profile-icon-16.jpg'
            }
            className="placeholder"
            alt="profile"
          />
        </div>
        <div className="profile-area">
          <Typography gutterBottom>
            {this.props.store.user.first_name} {this.props.store.user.last_name}
          </Typography>
          {/* TODO ROLE FROM USER REDUCER */}
          <Typography gutterBottom>HARDCODE ROLE</Typography>
          <Typography gutterBottom>{this.props.store.user.zip_code}</Typography>
          <Typography gutterBottom>
            {this.props.store.user.phone_number}
          </Typography>
          <Typography gutterBottom>{this.props.store.user.email}</Typography>
          <Typography gutterBottom>Skills:</Typography>
          {/* TODO SKILLS FROM USER REDUCER */}
          {/* <Typography gutterBottom>{skills}</Typography> */}
          <Button
            color="secondary"
            variant="contained"
            onClick={this.props.edit}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProfileInfoPanel);
