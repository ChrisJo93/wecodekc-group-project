import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Typography } from '@material-ui/core';

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
    console.log(details.event_description);

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
        <Grid container justify="space-evenly">
          <Grid item>
            <Typography variant="h3" component="h2" gutterBottom>
              Details!
              {details.event_description}
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Typography variant="h3" component="h2" gutterBottom>
            {details.event_title}
          </Typography>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
