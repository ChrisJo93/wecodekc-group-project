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
    selectionData: [],
  };

  handleSelection = (e) => {
    const selection = e.target.value;
    this.props.callback(selection);
    this.setState({
      ...this.state,
      selection: this.props.selection,
    });
  };

  render() {
    let selection;

    let labelsForGraph = this.props.store.ethnicity.map((item, i) => (
      <h3 key={i} style={{ color: item.color }}>
        {item.title}
      </h3>
    ));
    return (
      <div>
        <Grid container>
          <Grid item lg={4}>
            <FormControl style={{ minWidth: 120 }}>
              <Typography>View Demographics By</Typography>
              <Select
                variant="outlined"
                labelId="roleSelection"
                id="roleSelection"
                value={this.props.selection}
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
            <PieChart
              data={this.props.store.ethnicity}
              label={() => {
                return this.props.store.ethnicity.title;
              }}
            />
          </Grid>

          <Grid item lg={3}></Grid>
          <ul>{labelsForGraph}</ul>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanelDemographics);
