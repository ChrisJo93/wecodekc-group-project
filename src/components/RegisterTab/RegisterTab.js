import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//custom file imports
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterTab extends Component {
  render() {
    return <RegisterForm />;
  }
}

export default withRouter(connect()(RegisterTab));
