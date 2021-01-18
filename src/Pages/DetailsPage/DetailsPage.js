import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { DateTime } from 'luxon';

//material-ui imports
import { Grid, Typography, Button, Box } from '@material-ui/core';

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
    if (this.props.store.user.access_level >= 2) {
      this.props.dispatch({
        type: 'POST_USER_EVENT',
        payload: this.state.newUserEvent,
      });
      this.props.history.push('/events');
    } else {
      this.props.history.push('/login-register');
    }
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
            <Grid item lg={5}>
              <img src={details.link_url} alt="event image" />
            </Grid>
            <Grid item lg={3}>
              <Typography>Date: {humanDate}</Typography>
              <Typography> Location: {details.event_address}</Typography>
            </Grid>
            <Grid item lg={3}>
              <Box mb={2}>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={this.clickAttendButton}
                >
                  Click to attend
                </Button>
              </Box>
              <Box mb={2}>
                {this.props.store.user.access_level >= 4 && (
                  <Button variant="contained" color="secondary">
                    Update Event
                  </Button>
                )}
              </Box>
              <Box mb={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.clickBackButton}
                >
                  Back to all Events
                </Button>
              </Box>
            </Grid>
          </Grid>
          <div style={{ padding: 20 }}>
            <Typography>{details.event_description}</Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
