import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import { DateTime } from 'luxon';

import computer from './computer.jpg';
import computer2 from './computer2.jpg';
import UpdateDetailsDialog from './UpdateDetailsDialog';

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
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Paper>{details.event_title}</Paper>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Paper>Date: {humanDate}</Paper>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Paper>
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
                </Paper>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Paper>{details.event_address}</Paper>
              </Grid>
            </Grid>
            <div style={{ padding: 20 }}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Paper>Description: {details.event_description}</Paper>
                </Grid>
              </Grid>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.clickAttendButton}
                >
                  Click to attend Event
                </Button>
              </Grid>
              {this.props.store.user_level === 4 ||
                (5 && (
                  <Grid item xs={6}>
                    {/* <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleClickOpen}
                    >
                      Edit
                    </Button> */}
                    <UpdateDetailsDialog
                      onClose={this.handleClose}
                      open={this.open}
                      // selectedValue={}
                    />
                  </Grid>
                ))}

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.clickBackButton}
                >
                  Back to Events
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
