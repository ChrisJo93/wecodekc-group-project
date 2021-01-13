import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  TextField,
} from '@material-ui/core';

class CreateEventDialog extends Component {
  state = {
    open: true,
  };

  handleListItemClick = (value) => {
    this.setState({
      open: true,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Dialog onClose={this.props.onClose} open={this.props.open}>
          <DialogTitle id="create-event">Create An Event</DialogTitle>
          <DialogContent>
            {/* Added Grid but will need to reformat */}
            <Grid>
              <TextField
                type="text"
                variant="outlined"
                value={''}
                onChange={this.handleInputChangeFor('event_title')}
                label="title"
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={console.log('lol you clicked the add modal')}
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
            <Button
              onClick={this.props.onClose}
              color="secondary"
              variant="contained"
            >
              never mind
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateEventDialog);
