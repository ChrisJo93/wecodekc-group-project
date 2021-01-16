import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  ListItemText,
  ListItemAvatar,
  ListItem,
  List,
  Avatar,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) =>
  createStyles({
    // avatar: {
    //   backgroundColor: blue[100],
    //   color: blue[600],
    // },
    dialog: {
      padding: '300px',
    },
  });

class DateListDialog extends Component {
  handleListItemClick = (value) => {
    this.props.onClose(value);
  };

  render() {
    return (
      <Dialog
        onClose={this.props.onClose}
        open={this.props.open}
        className={this.props.classes.dialog}
      >
        <DialogTitle>Select An Event</DialogTitle>

        <List>
          {this.props.store.dateReducer <= 0 ? (
            <CircularProgress color="secondary" />
          ) : (
            this.props.store.dateReducer.map((date, index) => (
              <ListItem
                button
                onClick={() =>
                  this.handleListItemClick(
                    date.id ? date.id : console.log('no selection made')
                  )
                }
                key={index}
              >
                <ListItemAvatar>
                  <Avatar>
                    <CalendarTodayIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={date.event_title} />
              </ListItem>
            ))
          )}
        </List>
      </Dialog>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(muiStyles)(DateListDialog));
