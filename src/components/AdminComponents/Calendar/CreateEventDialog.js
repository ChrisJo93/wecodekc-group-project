import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//material ui imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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

//Calendar imports
import { RRule, RRuleSet, rrulestr } from 'rrule';

//custom imports
import RecurringForm from './RecurringForm';

class CreateEventDialog extends Component {
  state = {
    open: false,
    selectedValue: '',
    selectedRadialValue: 1,
    eventPayload: {
      event_title: '',
      event_description: '',
      event_address: '',
      event_start: '',
      event_end: '',
      recurring: false,
      event_type: '1',
      recurring_time_slot: 1,
    },
    rule: new RRule({
      freq: RRule.WEEKLY,
      interval: 0,
      byweekday: [],
      dtstart: '',
      until: '',
    }),
  };

  //posts event and closes dialog
  postEvent = (event) => {
    this.props.dispatch({
      type: 'POST_EVENTS',
      payload: this.state.eventPayload,
    });
    this.handleClose();
  };

  //opens the dialog
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  //closes the dialog, grabs date id as selectedValue
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
        ...this.state.eventPayload,
        [propertyName]: event.target.value,
      },
    });
  };

  //handle datetime picker values
  handleInputChangeForDate = (propertyName) => (event) => {
    //pulling value from date picker
    this.setState({
      eventPayload: {
        ...this.state.eventPayload,
        [propertyName]: event.target.value,
      },
    });
  };

  //handle recurrence switch
  handleInputChangeForSwitch = (event) => {
    this.setState({
      //slick toggle code
      eventPayload: {
        ...this.state.eventPayload,
        recurring: !this.state.eventPayload.recurring,
      },
    });
  };

  //handle radial button group
  handleRadialChange = (event) => {
    this.setState({
      eventPayload: {
        ...this.state.eventPayload,
        event_type: event.target.value,
      },
    });
  };

  handleChangeForFreq = (event) => (frequency) => {
    this.setState(
      {
        rule: { freq: frequency },
      },
      () => {
        console.log(this.state.rule.freq);
      }
    );
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
                  value={this.state.eventPayload.event_type}
                  onChange={this.handleRadialChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Event"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Course"
                  />

                  {/* This needs further work to handle ACTUAL recurrence.  */}
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={this.handleInputChangeForSwitch}
                        color="primary"
                        name="Recurring"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                    label="Repeat"
                  />
                  {this.state.eventPayload.recurring === true ? (
                    <RecurringForm
                      rule={this.state.rule}
                      handleChangeForFreq={this.handleChangeForFreq}
                    />
                  ) : (
                    ''
                  )}
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
              Never Mind
            </Button>
            <Button
              onClick={this.postEvent}
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateEventDialog);
