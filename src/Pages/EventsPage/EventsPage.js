import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './EventsPage.css';

import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from '@material-ui/core';

import computer from './computer.jpg';

class EventsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS',
      payload: this.props.store.events,
    });
  }

  render() {
    // const eventsArray = this.props.store.eventReducer.map((item, index) => {
    //   return (
    //     <Grid item xs={3} key={index}>
    //       <EventItem events={item} index={index} {...this.props} />
    //     </Grid>
    //   );
    // });

    return (
      <div className="grid">
        <div style={{ padding: 20 }}>
          <Grid item xs={3} md={3}>
            <img className="comp-img" src={computer} alt="coding" />
          </Grid>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="space-evenly"
            alignItems="stretch"
          >
            <h2>Click on an event to see its details!</h2>
          </Grid>
        </div>
        <div style={{ padding: 20 }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="stretch"
          >
            {/* {eventsArray} */}
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventsPage);
