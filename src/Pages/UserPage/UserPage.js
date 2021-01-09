import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Grid } from '@material-ui/core';
import './user.css';
import axios from 'axios';
import BigCalendar from '../../components/AdminComponents/Calendar/Calendar';

class UserPage extends Component {
  state = {
    event: '',
    name: 'Chris',
    role: 'A dude',
    zipcode: '71101',
    phone: '318-555-1029',
    email: 'adude@gmail.com',
    skills: 'C#, Python, ',
    image:
      'data:image/png;base64,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',
  };

  // componentDidMount() {
  //   axios
  //     .get('/event')
  //     .then((response) => {
  //       this.setState({
  //         event: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('couldnt pull user event', error);
  //       console.log('here is data', response.data);
  //     });
  // }

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <Grid container spacing={10} alignItems="center" justify="flex-start">
          <Grid item>
            <img src={this.state.image} className="placeholder" />

            <Grid container spacing={10} alignItems="flex-end" justify="center">
              <div>
                <p>{this.state.name}</p>
                <p>{this.state.role}</p>
                <p>{this.state.zipcode}</p>
                <p>{this.state.phone}</p>
                <p>{this.state.email}</p>
                <p>{this.state.skills}</p>
                <Button variant="primary">Edit Profile</Button>
                <LogOutButton className="log-in" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <BigCalendar />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
