import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom file imports
import EventListItem from '../../components/EventListItem/EventListItem';
import EventsBar from '../../components/EventsBar/EventsBar';

//material ui imports
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

class EventsPage extends Component {
  state = {
    typeOfEvent: '',
    //course = true/ event = false
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS',
    });
  }
  // handleChange = (e) => {
  //   this.setState({
  //     typeOfEvent: !this.props.store.eventReducer.event_type,
  //   });
  //   this.props.dispatch({
  //     type: 'GET_EVENTS',
  //     typeOfEvent: this.state.ascDsc,
  //   });
  // };

  // handleEdit = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     ascDsc: !this.state.edit,
  //   });
  // };

  render() {
    const eventsArray = this.props.store.eventReducer.map((item, index) => {
      return (
        <Grid item sm={12} md={4} lg={4}>
          <EventListItem
            key={index}
            event={item}
            index={index}
            {...this.props}
          />
        </Grid>
      );
    });

    return (
      <div style={{ padding: 20 }}>
        <EventsBar />
        <Grid container justify="space-evenly">
          <Grid item>
            <Typography variant="h3" component="h2" gutterBottom>
              Upcoming Events
            </Typography>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="filter">Sort By</InputLabel>
              <Select
                style={{ minWidth: 140 }}
                labelId="filter"
                id="filter"
                value={this.state.ascDsc}
                // onChange={this.handleChange}
                label="filter"
              >
                <MenuItem value={false} onChange={this.handleChange}>
                  Courses Only
                </MenuItem>
                <MenuItem value={true} onChange={this.handleChange}>
                  Events Only
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {eventsArray}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EventsPage);
