import React, { Component } from 'react';
import PieChart from 'react-minimal-pie-chart';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//material-ui imports
import {
  Grid,
  Select,
  FormControl,
  MenuItem,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
import axios from 'axios';

class ControlPanelDemographics extends Component {
  state = {
    defaultData: [{ title: 'One', value: 100, color: '#4d2aff' }],
    selectionData: [],
  };

  handleSelection = (e) => {
    const selection = e.target.value;
    this.props.callback(selection);
  };

  render() {
    const gender = this.props.store.gender;
    const ethnicity = this.props.store.ethnicity;
    const role = this.props.store.volunteerRole;
    let selection;
    return (
      <div>
        <Grid container>
          <Grid item lg={4}>
            <FormControl style={{ minWidth: 120 }}>
              <Typography>Sort By</Typography>
              <Select
                variant="outlined"
                labelId="roleSelection"
                id="roleSelection"
                value={this.state.selectData}
                onChange={this.handleSelection}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Volunteer Role</MenuItem>
                <MenuItem value={2}>Gender</MenuItem>
                <MenuItem value={3}>Ethnicity</MenuItem>
              </Select>
              <Box mt={2}>
                <Button variant="contained" color="secondary" s>
                  Download
                </Button>
              </Box>
            </FormControl>
          </Grid>
          <Grid item lg={2}>
            <PieChart data={this.state.defaultData} />
          </Grid>
          <Grid item lg={3}></Grid>
          <Grid item lg={3}>
            <Typography>Total Admins : </Typography>
            <Typography>Total Mentors : </Typography>
            <Typography>Total Volunteers : </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanelDemographics);
