import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import { Button, TextField, Typography } from '@material-ui/core';

class LoginForm extends Component {
  state = {
    username: '',
    user_password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.user_password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.user_password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.login}>
        <Typography gutterBottom component="h2" variant="h4">
          Login
        </Typography>
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )}
        <div>
          <TextField
            size="small"
            variant="outlined"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
            placeholder="username"
          ></TextField>
        </div>
        <div>
          <TextField
            size="small"
            variant="outlined"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
            placeholder="password"
          ></TextField>
        </div>
        <div>
          <Button color="primary" type="submit">
            Log In
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
