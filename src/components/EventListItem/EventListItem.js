import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//import for date/time config
import { DateTime } from 'luxon';

//MATERIAL-UI IMPORTS
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Grid,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) =>
  createStyles({
    // avatar: {
    //   backgroundColor: blue[100],
    //   color: blue[600],
    // },
    cardMedia: {
      height: '300px',
      [theme.breakpoints.down('sm')]: {
        height: '50%',
        width: '300px',
      },
    },
  });

class EventListItem extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS',
      payload: this.props.store.events,
    });
  }

  handleCLickDetails = (event) => {
    this.props.history.push(`/event/details/${this.props.event.id}`);
  };

  // const useStyles = makeStyles({
  //   card: { maxWidth: 345, },
  //   media: { height: 140, }, });

  render() {
    const { event } = this.props;
    const date = DateTime.fromISO(event.event_start);
    const humanDate = date.toLocaleString(DateTime.DATETIME_MED);
    return (
      <Card className="card">
        {event.event_type === 1 ? (
          <CardHeader
            avatar={<Avatar>C</Avatar>}
            title={event.event_title}
            subheader={humanDate}
          />
        ) : (
          <CardHeader
            avatar={<Avatar>E</Avatar>}
            title={event.event_title}
            subheader={humanDate}
          />
        )}

        <CardContent>
          <CardMedia
            className={this.props.classes.cardMedia}
            image={event.link_url}
            title="course"
          />
        </CardContent>

        <CardActions>
          <Grid container justify="space-evenly">
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={this.handleCLickDetails}
              >
                Details
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(connect()(withStyles(muiStyles)(EventListItem)));
