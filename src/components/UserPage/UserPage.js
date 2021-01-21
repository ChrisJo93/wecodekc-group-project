import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD:src/Pages/UserPage/UserPage.js
=======
import LogOutButton from '../LogOutButton/LogOutButton';
>>>>>>> main:src/components/UserPage/UserPage.js
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom file imports
import './user.css';
import ProfileInfoPanel from './ProfileInfoPanel';
import UserPageEdit from './UserPageEdit';
import UserEventItem from './UserEventItem';

//custom MATERIAL-UI imports
import { Grid, Typography, Container, LinearProgress } from '@material-ui/core';

class UserPage extends Component {
  state = {
    edit: false,
    event: '',
    image:
      'https://wecodekc.s3.us-east-2.amazonaws.com/default-profile-icon-16.jpg',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_VERIFIED_USER_DETAIL',
      payload: this.props.store.user.id,
    });
    this.props.dispatch({
      type: 'GET_USER_EVENTS',
    });
    this.props.dispatch({ type: 'GET_SKILL' });
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({
      edit: !this.state.edit,
    });
  };

  removeEvent = (e) => {
    console.log('remove clicked');
  };

  render() {
    const userEvent = this.props.store.userEventReducer.map((item, index) => {
      return (
        <Grid key={item.id} item sm={12}>
          <UserEventItem
            event={item}
            index={index}
            {...this.props}
            className="height"
          />
        </Grid>
      );
    });
    return this.props.store.verifiedUserDetailReducer[0] !== undefined ? (
      <div className="user-container">
        <Container>
          <Grid container justify="center">
            <Grid item lg={4} md={3} sm={12} xs={12}>
              {this.state.edit ? (
                <UserPageEdit edit={this.handleEdit} />
              ) : (
                <ProfileInfoPanel edit={this.handleEdit} />
              )}
            </Grid>
            <Grid item lg={8} md={9} sm={12} xs={12}>
              <div className="profile-area">
                <Typography variant="h4" gutterBottom>
                  {this.props.store.user.username}'s Events
                </Typography>
                <Grid container spacing={3}>
                  {userEvent}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    ) : (
      <LinearProgress color="secondary" />
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
