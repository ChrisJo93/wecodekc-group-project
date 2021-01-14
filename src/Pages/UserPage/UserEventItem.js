import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//import for date/time config
import { DateTime } from 'luxon';

//MATERIAL-UI IMPORTS
import {
  Card,
  CardActions,
  Button,
  Grid,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class UserEventItem extends Component {
  handleCLickDetails = (event) => {
    this.props.history.push(`/event/details/${this.props.event.id}`);
  };

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

        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={this.handleCLickDetails}
          >
            Details
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.removeEvent}
          >
            <DeleteOutlineIcon />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default connect()(withRouter(UserEventItem));
