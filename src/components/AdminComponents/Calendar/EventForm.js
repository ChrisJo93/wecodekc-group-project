import { Avatar, Dialog, List, ListItemAvatar } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { AddCircle } from '@material-ui/icons';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EventForm extends Component {
  state = {
    heading: 'Hi, Im the event form',
  };

  //   handleClose = () => {
  //     onClose(selectedValue);
  //   };

  //   handleListItemClick = (value) => {
  //     onClose(value);
  //   };

  //   handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   handleClose = (value) => {
  //     setOpen(false);
  //     setSelectedValue(value);
  //   };

  render() {
    return (
      <div>
        {/* <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
          <List>
            {this.props.store.dateReducer.map((date) => (
              <ListItem
                button
                onClick={() => handleListItemClick(date)}
                key={date}
              >
                <ListItemAvatar>
                  <Avatar className="avatarStyle">
                    <AddCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={date} />
              </ListItem>
            ))}

            <ListItem
              autoFocus
              button
              onClick={() => handleListItemClick('addAccount')}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
            </ListItem>
          </List>
        </Dialog> */}
        <h2>{this.state.heading}</h2>
        <button onClick={this.props.showForm}>lol</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventForm);
