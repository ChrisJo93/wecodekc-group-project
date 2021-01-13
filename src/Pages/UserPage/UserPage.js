import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_USER_EVENTS',
    });
  }

  render() {
    // const skills = this.props.store.xxxxxReducer.map((item, index) => {
    //   return (
    //     <div>
    //       <Typography key={index}>{item.xxxxx}</Typography>
    //     </div>
    //   );
    // });
    return (
      <div className="user-container">
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
                <Typography gutterBottom>
                  {this.props.store.user.first_name}{' '}
                  {this.props.store.user.last_name}
                </Typography>
                <Typography gutterBottom>{this.state.role}</Typography>
                <Typography gutterBottom>
                  {this.props.store.user.zip_code}
                </Typography>
                <Typography gutterBottom>
                  {this.props.store.user.phone_number}
                </Typography>
                <Typography gutterBottom>
                  {this.props.store.user.email}
                </Typography>
                <Typography gutterBottom>Skills:</Typography>
                {/* <Typography gutterBottom>{skills}</Typography> */}
                <Button color="secondary" variant="contained">
                  Edit Profile
                </Button>
              </div>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={12}>
              <div className="profile-area">
                <Typography gutterBottom>
                  {this.props.store.user.username}'s Events
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
