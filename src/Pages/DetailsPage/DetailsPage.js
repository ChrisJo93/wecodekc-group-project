import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';

class DetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS',
      payload: this.props.match.params.id,
    });
  }
  render() {
    return (
      <div>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="space-evenly"
          alignItems="stretch"
        >
          <h2>Details</h2>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
