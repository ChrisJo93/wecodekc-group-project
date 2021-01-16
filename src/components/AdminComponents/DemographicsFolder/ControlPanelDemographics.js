import React, { Component } from 'react';
import PieChart from 'react-minimal-pie-chart';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class ControlPanelDemographics extends Component {
  state = {
    selectData: 1,
  };

  // { title: 'One', value: 20, color: '#4d2aff' },
  //               { title: 'Two', value: 5, color: '#1eff9a' },
  //               { title: 'Three', value: 15, color: '#bab72d' },
  //               { title: 'four', value: 30, color: '#E38627' },
  //               { title: 'five', value: 10, color: '#C13C37' },
  //               { title: 'six', value: 10, color: '#6A2135' },
  //             ]

  handleSelection = (e) => {
    console.log(e.target.value);
    this.setState({
      selectData: e.target.value,
    });
  };

  render() {
    const gender = this.props.store.gender;
    const ethnicity = this.props.store.ethnicity;
    const role = this.props.store.volunteerRole;
    let selection;
    let graphData = [];
    return (
      <div>
        <Grid container>
          <Grid item lg={4}>
            <FormControl style={{ minWidth: 120 }}>
              <h3>Sort By</h3>
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
              <Button variant="contained" color="secondary" s>
                Download
              </Button>
            </FormControl>
          </Grid>
          <Grid item lg={2}>
            <h1>Demographics</h1>
            <PieChart data={graphData} />
          </Grid>
          <Grid item lg={3}></Grid>
          <Grid item lg={3}>
            <h4>Total Admins : </h4>
            <h4>Total Mentors : </h4>
            <h4>Total Volunteers : </h4>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanelDemographics);
