import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
  Button,
  Box,
  Grid,
} from '@material-ui/core';
import { RRule } from 'rrule';
import { DateTime } from 'luxon';

class RecurringForm extends Component {
  state = {
    freq: RRule.WEEKLY,
    interval: 1,
    byweekday: [],
    dtstart: new Date(Date.UTC(2021, 1, 1, 10, 30)),
    until: new Date(Date.UTC(2021, 12, 31)),
    eventPayload: {
      event_title: this.props.eventPayload.event_title,
      event_description: this.props.eventPayload.event_description,
      event_start: '',
      event_end: '',
      recurring: true,
      recurring_time_slot: 1,
      count: 1,
      frequency: 'weekly',
      event_address: this.props.eventPayload.event_address,
      event_type: 1,
    },
  };

  postEvent = (data) => {
    for (let i = 0; i < data.length; i++) {
      const payload = {
        event_title: this.props.eventPayload.event_title,
        event_description: this.props.eventPayload.event_description,
        event_start: new Date(data[i]).toISOString(),
        event_end: new Date(data[i]).toISOString(),
        recurring: true,
        recurring_time_slot: 1,
        count: 1,
        frequency: 'weekly',
        event_address: this.props.eventPayload.event_address,
        event_type: 1,
      };
      console.log(payload, 'here');
      this.props.dispatch({
        type: 'POST_EVENTS',
        payload,
      });
    }
  };

  handleChangeForFreqCheck = (event) => {
    this.setState({ freq: event.target.value });
  };

  handleChangeForInterval = (event) => {
    event.preventDefault();
    this.setState({
      interval: parseInt(event.target.value),
    });
  };

  handleChangeForDate = (date) => (event) => {
    this.setState({ ...this.state, [date]: new Date(event.target.value) });
  };

  handleRepeatEvent = (event) => {
    const rule = new RRule({
      freq: this.state.freq,
      interval: this.state.interval,
      byweekday: this.state.byweekday,
      dtstart: new Date(this.props.start),
      until: this.state.until,
    });

    this.postEvent(rule.all());
  };

  //I love this code so much
  //my personal genius, this function handles the state change for the day of week array but ALSO uses the switch function to change
  //the day integer from the checkbox BACK into a viable format for RRule
  handleChangeForDay = (day) => (event) => {
    this.setState({
      byweekday: [...this.state.byweekday, this.handleSwitchBack(day)],
    });
  };

  //changes RRule integer into a readable day for checkboxes
  handleSwitch = (day) => {
    switch (day) {
      case 0:
        day = 'Monday';
        return day;
        break;
      case 1:
        day = 'Tuesday';
        return day;
        break;
      case 2:
        day = 'Wednesday';
        return day;
        break;
      case 3:
        day = 'Thursday';
        return day;
        break;
      case 4:
        day = 'Friday';
        return day;
        break;
      case 5:
        day = 'Saturday';
        return day;
        break;
      case 6:
        day = 'Sunday';
        return day;
    }
  };
  //changes day integer back into viable RRule format
  handleSwitchBack = (day) => {
    switch (day) {
      case 0:
        day = RRule.MO;
        return day;
        break;
      case 1:
        day = RRule.TU;
        return day;
        break;
      case 2:
        day = RRule.WE;
        return day;
        break;
      case 3:
        day = RRule.TH;
        return day;
        break;
      case 4:
        day = RRule.FR;
        return day;
        break;
      case 5:
        day = RRule.SA;
        return day;
        break;
      case 6:
        day = RRule.SU;
        return day;
    }
  };

  render() {
    //adding RRule days to human readable array
    const monday = RRule.MO;
    const tuesday = RRule.TU;
    const wednesday = RRule.WE;
    const thursday = RRule.TH;
    const friday = RRule.FR;
    const saturday = RRule.SA;
    const sunday = RRule.SU;
    const dayarray = [
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    ];
    //mapping through those readable days to render as checkboxes
    const listofdays = dayarray.map((day, index) => {
      return (
        <FormControlLabel
          //using this switch function to rename the weekday's integer as a readable day
          label={this.handleSwitch(day.weekday)}
          key={index}
          control={
            <Checkbox
              color="primary"
              value={day}
              //adding whichever day of the week is checked to the array on state
              onChange={this.handleChangeForDay(day.weekday)}
              name={day}
            />
          }
        />
      );
    });
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel>Frequency</InputLabel>
              <Select
                variant="outlined"
                onChange={this.handleChangeForFreqCheck}
              >
                <MenuItem value={RRule.WEEKLY}>Weekly</MenuItem>
                <MenuItem value={RRule.MONTHLY}>Monthly</MenuItem>
                <MenuItem value={RRule.YEARLY}>Yearly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormLabel>Day of the Week</FormLabel>
            <FormGroup row>{listofdays}</FormGroup>
          </Grid>

          <Grid item>
            <TextField
              type="number"
              variant="outlined"
              value={
                this.state.interval <= 0 && this.state.interval === 0
                  ? ''
                  : this.state.interval
              }
              onChange={this.handleChangeForInterval}
              label="Interval"
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              id="datetime-local"
              label="Repeat Until"
              type="datetime-local"
              onChange={this.handleChangeForDate('until')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item>
            <Button
              onClick={this.handleRepeatEvent}
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RecurringForm);
