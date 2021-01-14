import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';

class DateListDialog extends Component {
  state = {
    events: this.props.store.dateReducer,
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = (value) => {
    this.props.onClose(value);
  };

  render() {
    return (
      <Dialog
        onClose={this.props.onClose}
        aria-labelledby="simple-dialog-title"
        open={this.props.open}
      >
        <DialogTitle id="simple-dialog-title">Select An Event</DialogTitle>
        <List>
          {this.state.events.map((date) => (
            <ListItem
              button
              onClick={() => this.handleListItemClick(date)}
              // key={date}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={date.event_title} />
            </ListItem>
          ))}
          {/* This part is for an automatic "add" button to render with list. Might use for extra functionality. Prolly not. */}
          {/* <ListItem
            autoFocus
            button
            onClick={() => this.handleListItemClick(this.state.events[1].id)}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="fuck lol" />
          </ListItem> */}
        </List>
      </Dialog>
    );
  }
}

export default connect(mapStoreToProps)(DateListDialog);
