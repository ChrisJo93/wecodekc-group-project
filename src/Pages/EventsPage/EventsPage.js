import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EventListItem from '../../components/EventListItem/EventListItem';

// import './EventsPage.css';

import { Grid } from '@material-ui/core';

import computer from './computer.jpg';

class EventsPage extends Component {
  componentDidMount() {
    console.log(this.props.store.eventReducer);
    this.props.dispatch({
      type: 'GET_EVENTS',
    });
  }

  render() {
    const eventsArray = this.props.store.eventReducer.map((item, index) => {
      return (
        <Grid item xs={3} key={index}>
          <EventListItem event={item} index={index} {...this.props} />
        </Grid>
      );
    });

    return (
      <div className="grid">
        <div style={{ padding: 20 }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={6}
              md={3}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <img src={computer} alt="coding" />
            </Grid>
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
            {eventsArray}
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventsPage);
