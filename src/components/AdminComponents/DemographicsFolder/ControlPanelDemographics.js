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
    let graphData = [{ title: 'One', value: 20, color: '#4d2aff' }];
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
            <Typography>Demographics</Typography>
            <PieChart data={graphData} />
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
