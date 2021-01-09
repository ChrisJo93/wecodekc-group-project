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
  handleCLickDetails = (event) => {
    // this.props.history.push(`/details/${this.props.eventId}`);
  };

  render() {
    const { events } = this.props;

    const eventsArray = this.props.store.eventReducer.map((item, index) => {
      return (
        <Grid item xs={3} key={index}>
          <EventItem events={item} index={index} {...this.props} />
        </Grid>
      );
    });
    return (
      <div>
        <Card>
          <CardActionArea key={item.id} onClick={this.handleCLickDetails}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.event_title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="ul">
                <li className="cardList">{event.}</li>
                <li className="cardList">
                  {item.event_address}, {item.event_start}
                </li>
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
