import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';

class EventListItem extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS',
      payload: this.props.store.events,
    });
  }

  handleCLickDetails = (event) => {
    // this.props.history.push(`/details/${this.props.eventId}`);
  };

  render() {
    const { event } = this.props;
    return (
      <Grid item sm={12} md={4} lg={4}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {event.event_title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="ul">
              <li className="cardList">{event.event_address}</li>
              <li>{event.event_start}</li>
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={this.handleCLickDetails}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default connect()(withRouter(EventListItem));
