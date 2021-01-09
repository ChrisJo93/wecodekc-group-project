import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import { Button, TextField, Typography, Box, Grid } from '@material-ui/core';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
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
      <form className="opacity" onSubmit={this.login}>
        <Grid container justify="center">
          <Grid item>
            <Typography gutterBottom component="h2" variant="h4">
              Login
            </Typography>
            {this.props.store.errors.loginMessage && (
              <h3 className="alert" role="alert">
                {this.props.store.errors.loginMessage}
              </h3>
            )}
            <div>
              <Box mb={2}>
                <TextField
                  size="small"
                  variant="outlined"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                  placeholder="username"
                ></TextField>
              </Box>
            </div>
            <div>
              <Box mb={2}>
                <TextField
                  size="small"
                  variant="outlined"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                  placeholder="password"
                ></TextField>
              </Box>
            </div>
            <div>
              <Button color="primary" variant="contained" type="submit">
                Log In
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
