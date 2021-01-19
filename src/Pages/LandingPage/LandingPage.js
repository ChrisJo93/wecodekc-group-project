import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Carousel from 'react-material-ui-carousel';

//CUSTOM FILE IMPORTS
import './LandingPage.css';
import EventListItem from '../../components/EventListItem/EventListItem';

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
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) =>
  createStyles({
    cardMedia: {
      height: '400px',
      [theme.breakpoints.down('sm')]: {
        height: '50%',
      },
    },
    // textBackground: {
    //   backgroundColor: '#dbf0f7',
    // },
  });

class LandingPage extends Component {
  //get all events for the carousel
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS',
    });
  }

  state = {};

  onLogin = (event) => {
    this.props.history.push('/login-register');
  };

  handleRegisterMentor = (e) => {
    this.props.history.push('/registration/page/1');
  };

  handleRegisterVolunteer = (e) => {
    this.props.history.push('/registration/page/1');
  };

  render() {
    const eventsArray = this.props.store.eventReducer.map((item, index) => {
      return (
        <EventListItem
          key={index}
          event={item}
          index={index}
          store={this.props.store}
        />
      );
    });
    return (
      <div className="grid">
        <Grid
          container
          alignItems="center"
          className={this.props.classes.textBackground}
        >
          <Grid item xs={12} md={6}>
            <div className="card" style={{ padding: '0px 50px 0px 50px' }}>
              <CardContent>
                <center>
                  <Typography variant="h4" gutterBottom>
                    Make an Impact!
                  </Typography>
                </center>
                <Typography>
                  <p>
                    Our mission is to give youth the opportunity to learn
                    technology concepts, and leadership skills; creating a
                    pipeline of future-ready professionals through project-based
                    learning and innovative programs.<br></br>
                    <br></br>
                    WE CODE KC is an initiative that serves the urban core of
                    Kansas City, exposing youth to various programming
                    languages, technology, cyber security, and computer science
                    concepts. Learning the basic concept of coding develops
                    creativity, problem solving skills, builds confidence and
                    helps to build a positive future. Every child, no matter
                    their zip code or their family’s financial status, should
                    have the opportunity to learn to code.
                  </p>
                </Typography>
              </CardContent>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <CardMedia
                image="https://wecodekc.s3.us-east-2.amazonaws.com/Event+Images/_W4A0840.jpg"
                title="coding"
                className={this.props.classes.cardMedia}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <CardMedia
                image="https://wecodekc.s3.us-east-2.amazonaws.com/christina-wocintechchat-com-YVT21p6pO_g-unsplash.jpg"
                title="coding"
                className={this.props.classes.cardMedia}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Carousel style={{ height: '60%' }}>{eventsArray}</Carousel>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="card" style={{ padding: '0px 50px 0px 50px' }}>
              <center>
                <Typography variant="h4">Volunteer</Typography>
              </center>
              <Typography>
                No technical experience required! We have a variety of jobs for
                which we need people, such as classroom assistants and general
                office help.
              </Typography>

              <Grid container justify="space-evenly">
                <Grid item style={{ margin: '20px' }}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.handleRegisterVolunteer}
                    size="large"
                  >
                    register
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <CardMedia
                image="https://wecodekc.s3.us-east-2.amazonaws.com/_MG_6534.JPG"
                title="volunteer"
                className={this.props.classes.cardMedia}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <CardMedia
                image="https://wecodekc.s3.us-east-2.amazonaws.com/_MG_6571-1.jpg"
                title="mentor"
                className={this.props.classes.cardMedia}
                size="large"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="card" style={{ padding: '0px 50px 0px 50px' }}>
              <center>
                <Typography variant="h4">Mentor</Typography>
              </center>
              <Typography>
                We rely on mentors and we appreciate your commitment to offer
                your time. Mentors have different sets of skills and are
                technically skilled individuals who guide attendees and
                facilitate their learning.
              </Typography>

              <Grid container justify="space-evenly">
                <Grid item style={{ margin: '20px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleRegisterMentor}
                    size="large"
                  >
                    register
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(muiStyles)(LandingPage));
