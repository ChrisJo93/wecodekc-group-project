import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Material-UI imports
import { Button, TextField, Typography } from '@material-ui/core';

//custom file imports
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterTab extends Component {
  state = {};

  render() {
    return <RegisterForm />;
  }
}

export default withRouter(connect()(RegisterTab));
