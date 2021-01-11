import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EventListItem from '../../components/EventListItem/EventListItem';

// import './EventsPage.css';

import { Card, Grid } from '@material-ui/core';

import computer from './computer.jpg';
import computer2 from './computer2.jpg';
import child1 from './Child1.jpg';
import child2 from './Child2.jpg';

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
        <EventListItem key={index} event={item} index={index} {...this.props} />
      );
    });

    return (
      <div className="grid">
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

          <h2>Click on an event to see its details!</h2>
        </div>
        <Grid container spacing={3}>
          {eventsArray}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventsPage);
