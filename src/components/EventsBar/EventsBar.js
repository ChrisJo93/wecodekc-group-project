import React, { Component } from 'react';

//material ui imports
import { Grid } from '@material-ui/core';

class EventsBar extends Component {
  render() {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <img
              src={
                'https://wecodekc.s3.us-east-2.amazonaws.com/WeCodeKC-COLORLOGO.jpg'
              }
              alt="coding"
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <img
              src={
                'https://wecodekc.s3.us-east-2.amazonaws.com/922e1182-57e8-45a1-a6d3-87d81ef028b2_christopher-gower-m_HRfLhgABo-unsplash.jpg'
              }
              alt="coding"
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <img
              src={
                'https://wecodekc.s3.us-east-2.amazonaws.com/WeCodeKC-COLORLOGO.jpg'
              }
              alt="coding"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EventsBar;
