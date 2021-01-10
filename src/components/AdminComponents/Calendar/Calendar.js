import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import axios from 'axios';

//calendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventForm from './EventForm';
import '@fullcalendar/daygrid';
import '@fullcalendar/interaction';
import '@fullcalendar/common';
import '@fullcalendar/timegrid/main.css';
import './calendarStyle.css';

class Calendar extends Component {
  //   calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [],
  };

  //grabbing all events and adding to event array
  componentDidMount() {
    axios
      .get('/api/event')
      .then((response) => {
        console.log(response);
        this.setState({
          calendarEvents: response.data,
        });
      })
      .catch((err) => {
        console.log('error in calendar get', err);
      });
  }

  addEvent = (event) => {
    axios
      .post('/api/events', event)
      .then((response) => {
        console.log(response, 'is anything here?');
      })
      .catch((error) => {
        console.log('error pposting', error);
      });
  };

  render() {
    return (
      <div className="calendar">
        <div className="calendar-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
        </div>
        <div className="calendar-proper">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
        <EventForm />
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  };

  handleDateClick = (argument) => {
    //argument is a built in object
    if (
      window.confirm(
        'Would you like to add an event to ' + argument.dateStr + ' ?'
      )
    ) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: 'New Event',
          start: argument.date,
          allDay: argument.allDay,
        }),
      });
    }
  };
}

export default connect(mapStoreToProps)(Calendar);
