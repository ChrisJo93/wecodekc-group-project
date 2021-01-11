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
} from '@material-ui/core';

class EventListItem extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS',
      payload: this.props.store.events,
    });
  }

  handleCLickDetails = (event) => {
    this.props.history.push(`/event/details/${this.props.eventId}`);
  };

  render() {
    const { event } = this.props;

    // const events = this.props.store.eventReducer.map((item, index) => {
    //   return (
    //     <Grid item xs={3} key={index}>
    //       <EventListItem events={item} index={index} {...this.props} />
    //     </Grid>
    //   );
    // });
    return (
      <div>
        <Card>
          <CardActionArea key={event.id} onClick={this.handleCLickDetails}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {event.event_title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="ul">
                <li className="cardList">{event.event_address}</li>
                <li>{event.event_start}</li>
              </Typography>
            </CardContent>
          </CardActionArea>
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
      </div>
    );
  }
}

export default connect()(withRouter(EventListItem));
