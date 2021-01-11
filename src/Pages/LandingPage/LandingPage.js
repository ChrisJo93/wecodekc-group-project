import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import computer from './computer.jpg';

//NEEDS images and video and event carousel.

//Material-UI imports
import {
  Box,
  Grid,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Container,
} from '@material-ui/core';

class LandingPage extends Component {
  state = {};

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  handleRegisterMentor = (e) => {
    this.props.history.push('/registration/page/1');
  };

  handleRegisterVolunteer = (e) => {
    this.props.history.push('/registration/page/1');
  };

  render() {
    return (
      <div className="grid">
        <Grid container alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Card>
              <Typography>Make an Impact!</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur id felis metus. Vestibulum et pulvinar tortor. Morbi
                pharetra lacus ut ex molestie blandit. Etiam et turpis sit amet
                risus mollis interdum. Suspendisse et justo vitae metus bibendum
                fringilla sed sed justo. Aliquam sollicitudin dapibus lectus,
                vitae consequat odio elementum eget. Praesent efficitur eros
                vitae nunc interdum, eu interdum justo facilisis. Sed pulvinar
                nulla ac dignissim efficitur. Quisque eget eros metus.
                Vestibulum bibendum fringilla nibh a luctus. Duis a sapien
                metus.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* TO DO -- FIGURE OUT IMAGES */}
            <Card>
              <img
                src={'https://wecodekc.s3.us-east-2.amazonaws.com/_W4A0840.jpg'}
                alt="coding"
              />
              <CardMedia
                image="https://wecodekc.s3.us-east-2.amazonaws.com/_W4A0840.jpg"
                title="coding"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <img src={computer} alt="coding" />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Typography>Upcoming Events</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography>Volunteer</Typography>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur id felis metus. Vestibulum et pulvinar tortor. Morbi
                  pharetra lacus ut ex molestie blandit. Etiam et turpis sit
                  amet risus mollis interdum. Suspendisse et justo vitae metus
                  bibendum fringilla sed sed justo. Aliquam sollicitudin dapibus
                  lectus, vitae consequat odio elementum eget. Praesent
                  efficitur eros vitae nunc interdum, eu interdum justo
                  facilisis. Sed pulvinar nulla ac dignissim efficitur. Quisque
                  eget eros metus. Vestibulum bibendum fringilla nibh a luctus.
                  Duis a sapien metus.
                </p>
              </CardContent>
              <CardActions>
                <Button onClick={this.handleRegisterVolunteer}>register</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <img src={computer} alt="coding" />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <img src={computer} alt="coding" />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography>Mentor</Typography>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur id felis metus. Vestibulum et pulvinar tortor. Morbi
                  pharetra lacus ut ex molestie blandit. Etiam et turpis sit
                  amet risus mollis interdum. Suspendisse et justo vitae metus
                  bibendum fringilla sed sed justo. Aliquam sollicitudin dapibus
                  lectus, vitae consequat odio elementum eget. Praesent
                  efficitur eros vitae nunc interdum, eu interdum justo
                  facilisis. Sed pulvinar nulla ac dignissim efficitur. Quisque
                  eget eros metus. Vestibulum bibendum fringilla nibh a luctus.
                  Duis a sapien metus.
                </p>
              </CardContent>
              <CardActions>
                <Button onClick={this.handleRegisterMentor}>register</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <center>
          <h4>Already a Member?</h4>
          <button className="btn btn_sizeSm" onClick={this.onLogin}>
            Login
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
