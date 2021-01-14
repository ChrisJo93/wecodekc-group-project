import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { DateTime } from 'luxon';

//material-ui imports
import { Grid, Typography, Button } from '@material-ui/core';

//custom file imports
import EventsBar from '../../components/EventsBar/EventsBar';

class DetailsPage extends Component {
  state = {
    newUserEvent: {
      eventId: this.props.match.params.id,
      approved: 'false',
    },
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENT_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  clickAttendButton = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'POST_USER_EVENT',
      payload: this.state.newUserEvent,
    });
  };

  clickBackButton = (event) => {
    this.props.history.push('/events');
  };

  render() {
    const details = this.props.store.eventDetailReducer;
    const date = DateTime.fromISO(details.event_start);
    const humanDate = date.toLocaleString(DateTime.DATETIME_MED);

    return (
      <div style={{ padding: 20 }}>
        <EventsBar />
        <div style={{ padding: 20 }}>
          <Typography variant="h2" gutterBottom>
            {details.event_title}
          </Typography>

          <Grid container spacing={3}>
            <Grid item lg={3}>
              {details.event_type === 1 ? (
                <img
                  src={
                    'https://wecodekc.s3.us-east-2.amazonaws.com/_W4A0876-1.jpg'
                  }
                  alt="course"
                />
              ) : (
                <img
                  src={
                    'https://wecodekc.s3.us-east-2.amazonaws.com/_W4A0816-1.jpg'
                  }
                  alt="event"
                />
              )}
            </Grid>
            <Grid item lg={9}>
              <Typography>Date: {humanDate}</Typography>
              <Typography> Location: {details.event_address}</Typography>
            </Grid>
          </Grid>
          <div style={{ padding: 20 }}>
            <Typography>{details.event_description}</Typography>
          </div>
          <Grid container justify="space-evenly" spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clickAttendButton}
              >
                Click to attend
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.clickBackButton}
              >
                Back to all Events
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
