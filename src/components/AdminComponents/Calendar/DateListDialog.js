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
  handleListItemClick = (value) => {
    this.props.onClose(value);
  };

  render() {
    return (
      <Dialog onClose={this.props.onClose} open={this.props.open}>
        <DialogTitle>Select An Event</DialogTitle>

        <List>
          {this.props.store.dateReducer <= 0
            ? 'No Events For This Date'
            : this.props.store.dateReducer.map((date, index) => (
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
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={date.event_title} />
                </ListItem>
              ))}
        </List>
      </Dialog>
    );
  }
}

export default connect(mapStoreToProps)(DateListDialog);
