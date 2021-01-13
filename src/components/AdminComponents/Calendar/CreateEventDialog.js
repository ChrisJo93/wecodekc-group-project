import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from '@material-ui/core';

class CreateEventDialog extends Component {
  state = {
    open: false,
    selectedValue: '',
    selectedRadialValue: 'Course',
    eventPayload: {
      event_title: '',
      event_description: '',
      event_address: '',
      event_start: '',
      event_end: '',
      recurring: false,
    },
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
    console.log('getting there');
  };

  handleClose = (value) => {
    this.setState({
      open: false,
      selectedValue: value,
    });
  };
  //handle text inputs
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      eventPayload: {
        [propertyName]: event.target.value,
      },
    });
  };

  //handle datetime picker values
  handleInputChangeForDate = (propertyName) => (event) => {
    //pulling value from date picker
    this.setState({
      eventPayload: {
        [propertyName]: event.target.value,
      },
    });
  };

  //handle recurrence switch
  handleInputChangeForSwitch = (event) => {
    this.setState({
      //slick toggle code
      recurring: !this.state.recurring,
    });
  };

  //handle radial button group
  handleRadialChange = (event) => {
    this.setState({
      selectedRadialValue: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleClickOpen}
        >
          Add Event
        </Button>
        <Dialog onClose={this.handleClose} open={this.state.open}>
          <DialogTitle id="create-event">Create An Event</DialogTitle>
          <DialogContent>
            {/* Added Grid but will need to reformat */}
            <Grid>
              <TextField
                type="text"
                variant="outlined"
                value={this.state.eventPayload.event_title}
                onChange={this.handleInputChangeFor('event_title')}
                label="Title"
              />
              <TextField
                type="text"
                variant="outlined"
                value={this.state.eventPayload.event_description}
                onChange={this.handleInputChangeFor('event_description')}
                label="Description"
              />
              <TextField
                type="text"
                variant="outlined"
                value={this.state.eventPayload.event_address}
                onChange={this.handleInputChangeFor('event_address')}
                label="Address"
              />
              <TextField
                id="datetime-local"
                label="Start Date"
                type="datetime-local"
                onChange={this.handleInputChangeForDate('event_start')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="datetime-local"
                label="End Date"
                type="datetime-local"
                onChange={this.handleInputChangeForDate('event_end')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Event Type</FormLabel>
                <RadioGroup
                  aria-label="Event_Type"
                  name="Events"
                  value={this.state.selectedRadialValue}
                  onChange={this.handleRadialChange}
                >
                  <FormControlLabel
                    value="Event"
                    control={<Radio />}
                    label="Event"
                  />
                  <FormControlLabel
                    value="Course"
                    control={<Radio />}
                    label="Course"
                  />

                  {/* This needs further work to handle ACTUAL recurrence.  */}
                  <FormControlLabel
                    control={
                      <Switch
                        // checked={this.state.recurring}
                        onChange={this.handleInputChangeForSwitch}
                        color="primary"
                        name="Recurring"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                    label="Repeat"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
            <Button
              onClick={this.handleClose}
              color="secondary"
              variant="contained"
            >
              Never Mind
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateEventDialog);
