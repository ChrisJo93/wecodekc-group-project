import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Typography, Paper, Button } from '@material-ui/core';

import computer from './computer.jpg';
import computer2 from './computer2.jpg';

class DetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENT_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  render() {
    const details = this.props.store.eventDetailReducer;
    console.log(this.props.store.eventDetailReducer);

    return (
      <div style={{ padding: 20 }}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <img src={computer2} alt="coding" />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <img src={computer} alt="coding" />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <img src={computer2} alt="coding" />
          </Grid>
        </Grid>
        <div style={{ padding: 20 }}>
          <Grid container spacing={3}>
            <Grid xs={4} sm={4} md={4} lg={4}>
              <Paper variant="outlined">{details.event_title}</Paper>
              <Paper>Date: {details.event_start}</Paper>
            </Grid>
            <Grid container spacing={3}>
              <Grid xs={4} sm={4} md={4} lg={4}>
                <Paper>{details.event_address}</Paper>
              </Grid>
            </Grid>
            <div style={{ padding: 20 }}>
              <Grid container spacing={3}>
                <Grid xs={4} sm={4} md={4} lg={4}>
                  <Paper>Description: {details.event_description}</Paper>
                </Grid>
              </Grid>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary">
                  Click to attend Event
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary">
                  Back to Events
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
        {/* <Grid container justify="space-evenly">
          <Grid item>
            <Typography variant="h3" component="h2" gutterBottom>
              <p>{details.event_title}</p>
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Typography variant="h3" component="h2" gutterBottom></Typography>
        </Grid> */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
