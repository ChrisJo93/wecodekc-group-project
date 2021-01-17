import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

//calendar imports
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import '@fullcalendar/daygrid';
import '@fullcalendar/interaction';
import '@fullcalendar/common';
import '@fullcalendar/timegrid/main.css';
import './calendarStyle.css';

//custom file import
import axios from 'axios';
import { DateTime } from 'luxon';
import CreateEventDialog from './CreateEventDialog';
import DateListDialog from './DateListDialog';

class Calendar extends Component {
  state = {
    open: false,
    selectedValue: 'Nothing Selected',
    calendarWeekends: true,
    calendarEvents: [
      {
        title: '',
        start: '',
        end: '',
      },
    ],
    showForm: false,
  };

  //grabbing all events and adding to event array
  //using a direct axios call to avoid convoluting data.
  componentDidMount() {
    axios
      .get('/api/event')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // if (response.data[i].recurring) {
          // }
          this.setState({
            // adding new event to array
            calendarEvents: this.state.calendarEvents.concat({
              // creates a new event object
              title: response.data[i].event_title,
              start: response.data[i].event_start,
              end: response.data[i].event_end,
              // We will use rrule for mock data if we can't solve issue before Sunday.
              // rrule: {
              //   count: 2,
              //   freq: 'weekly',
              //   interval: 3,
              //   byweekday: [],
              //   dtstart: response.data[i].event_start,
              // },
            }),
          });
        }
      })
      .catch((err) => {
        console.log('error in calendar get', err);
      });
  }
  //sending dates for event population modal
  sendDate = (date) => {
    const fixer = DateTime.fromISO(date);
    const fixedDate = fixer.toISODate();
    this.props.dispatch({
      type: 'GET_DATES',
      payload: fixedDate,
    });
  };

  showForm = (event) => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };

  handleDateClick = (argument) => {
    //sending date to date fixer function (sendDate)
    this.sendDate(argument.dateStr);

    this.setState({
      // add new event data
      calendarEvents: this.state.calendarEvents.concat({
        // creates a new array
        title: this.state.calendarEvents.title,
        start: this.state.calendarEvents.start,
        end: this.state.calendarEvents.end,
      }),
    });
    //opens event list modal
    this.handleClickOpen();
  };

  handleClickOpen = () => {
    this.setState({
      //toggle for open close
      open: !this.state.open,
    });
  };

  handleClose = (value) => {
    this.setState({
      open: false,
      selectedValue:
        //allows click outside of modal to close it. Prevents load bug.
        value == (null, undefined, '') ? value : this.state.selectedValue,
    });
    //push only when an event id is present
    if (value > 0) {
      this.props.history.push(`/event/details/${value}`);
    }
  };

  render() {
    return (
      <div className="calendar">
        <CreateEventDialog />

        <div>
          <br />
          <DateListDialog
            open={this.state.open}
            onClose={this.handleClose}
            selectedValue={this.state.selectedValue}
          />
        </div>
        <div className="calendar-proper">
          <FullCalendar
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prevYear,nextYear,prev,next,today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              rrulePlugin,
            ]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(Calendar));
