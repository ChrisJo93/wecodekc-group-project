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
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [
      {
        title: '',
        start: '',
        end: '',
      },
    ],
    showForm: true,
  };

  //grabbing all events and adding to event array
  componentDidMount() {
    axios
      .get('/api/event')
      .then((response) => {
        //cycling through entire array
        for (let i = 0; i < response.data.length; i++) {
          this.setState({
            // adding new event to array
            calendarEvents: this.state.calendarEvents.concat({
              // creates a new event object
              title: response.data[i].event_title,
              start: response.data[i].event_start,
              end: response.data[i].event_end,
            }),
          });
        }
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

  //this seems superfluous, might remove entirely
  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  //need to make this dynamic with an input field
  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  };

  handleDateClick = (argument) => {
    //argument is a built in object
    console.log(argument);
    if (
      window.confirm(
        'Would you like to add an event to ' + argument.dateStr + ' ?'
      )
    ) {
      this.setState({
        // add new event data
        showForm: true,
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: this.state.calendarEvents.title,
          start: this.state.calendarEvents.start,
          end: this.state.calendarEvents.end,
        }),
      });
    }
  };

  render() {
    return (
      <div className="calendar">
        <div className="calendar-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
        </div>
        {this.state.showForm === true ? <EventForm /> : ''}
        <div className="calendar-proper">
          <FullCalendar
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prevYear,nextYear,prev,next,today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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

export default connect(mapStoreToProps)(Calendar);
