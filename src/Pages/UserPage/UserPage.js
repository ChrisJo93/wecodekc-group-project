import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom file imports
import './user.css';

//custom MATERIAL-UI imports
import { Button, Grid, Typography, Container } from '@material-ui/core';

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
      'https://wecodekc.s3.us-east-2.amazonaws.com/default-profile-icon-16.jpg',
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

  render() {
    return (
      <Container>
        <Grid container justify="center">
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <div>
              <img
                src={this.state.image}
                className="placeholder"
                alt="profile"
              />
            </div>
            <div className="profile-area">
              <Typography gutterBottom>{this.state.name}</Typography>
              <Typography gutterBottom>{this.state.role}</Typography>
              <Typography gutterBottom>{this.state.zipcode}</Typography>
              <Typography gutterBottom>{this.state.phone}</Typography>
              <Typography gutterBottom>{this.state.email}</Typography>
              <Typography gutterbottom>Skills:</Typography>
              <Typography gutterBottom>{this.state.skills}</Typography>
              <Button color="secondary" variant="contained">
                Edit Profile
              </Button>
              {/* <LogOutButton className="log-in" /> */}
            </div>
          </Grid>
          <Grid item lg={8} md={8} sm={8} xs={12}>
            <div className="profile-area">
              <Typography gutterBottom>{this.state.name}'s Events</Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
