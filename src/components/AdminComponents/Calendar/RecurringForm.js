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
} from '@material-ui/core';
import { RRule, RRuleSet, rrulestr } from 'rrule';

class RecurringForm extends Component {
  state = {
    freq: 'sillyWillies',
    interval: '',
    byweekday: [],
    dtstart: new Date(),
    until: new Date(),
    checked: false,
    age: 1,
  };

  handleChangeForFreqCheck = (event) => {
    this.setState({ freq: event.target.value });
  };

  handleChangeForInterval = (event) => {
    event.preventDefault();
    this.setState(
      {
        interval: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleChangeForDay = (day) => (event) => {
    this.setState(
      {
        byweekday: [...this.state.byweekday, this.handleSwitch(day)],
      },
      () => {
        console.log('lol', this.handleSwitch(day));
      }
    );
  };

  handleSwitch = (day) => {
    switch (day) {
      case 0:
        day = 'Sunday';
        return day;
        break;
      case 1:
        day = 'Monday';
        return day;
        break;
      case 2:
        day = 'Tuesday';
        return day;
        break;
      case 3:
        day = 'Wednesday';
        return day;
        break;
      case 4:
        day = 'Thursday';
        return day;
        break;
      case 5:
        day = 'Friday';
        return day;
        break;
      case 6:
        day = 'Saturday';
        return day;
    }
  };

  render() {
    const monday = RRule.MO;
    const tuesday = RRule.TU;
    const wednesday = RRule.WE;
    const thursday = RRule.TH;
    const friday = RRule.FR;
    const saturday = RRule.SA;
    const sunday = RRule.SU;
    const dayarray = [
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    ];

    const listofdays = dayarray.map((day, index) => {
      return (
        <FormControlLabel
          label={this.handleSwitch(day.weekday)}
          key={index}
          control={
            <Checkbox
              color="primary"
              value={day}
              onChange={this.handleChangeForDay(day.weekday)}
              name={day}
            />
          }
        />
      );
    });
    return (
      <div>
        <FormControl>
          <InputLabel>Frequency</InputLabel>
          <Select variant="outlined" onChange={this.handleChangeForFreqCheck}>
            <MenuItem value={RRule.WEEKLY}>Weekly</MenuItem>
            <MenuItem value={RRule.MONTHLY}>Monthly</MenuItem>
            <MenuItem value={RRule.YEARLY}>Yearly</MenuItem>
          </Select>
          <FormLabel>Day of the Week</FormLabel>
          <FormGroup row>{listofdays}</FormGroup>
        </FormControl>
        <br />
        <TextField
          type="number"
          variant="outlined"
          value={this.state.interval}
          onChange={this.handleChangeForInterval}
          label="Interval"
        />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RecurringForm);
