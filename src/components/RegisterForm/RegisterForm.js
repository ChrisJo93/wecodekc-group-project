import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    sex: '',
    race: '',
    email: '',
    phone_number: '',
    zip_code: '',
    company: '',
    job_title: '',
    education_level: '',
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form className="formPanel" onSubmit={this.registerUser}>
          <Typography gutterBottom>Register User</Typography>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}
          <TextField
            size="small"
            placeholder="first name"
            type="text"
            name="first_name"
            value={this.state.first_name}
            required
            variant="outlined"
            onChange={this.handleInputChangeFor('first_name')}
          />
          <TextField
            size="small"
            placeholder="middle name/initial"
            type="text"
            name="middle_name"
            value={this.state.first_name}
            required
            variant="outlined"
            onChange={this.handleInputChangeFor('middle_name')}
          />
          <TextField
            size="small"
            placeholder="last name"
            type="text"
            name="last_name"
            value={this.state.first_name}
            required
            variant="outlined"
            onChange={this.handleInputChangeFor('last_name')}
          />
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sex">Sex</InputLabel>
            <Select
              labelId="sex"
              id="sex"
              value={this.state.sex}
              onChange={this.handleInputChangeFor('gesexnder')}
              label="sex"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>

              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="email"
            type="email"
            name="email"
            value={this.state.email}
            variant="outlined"
            onChange={this.handleInputChangeFor('email')}
          />
          <TextField
            size="small"
            placeholder="phone number"
            // type="number"
            name="phone_number"
            value={this.state.phone_number}
            variant="outlined"
            onChange={this.handleInputChangeFor('phone_number')}
          />
          <TextField
            size="small"
            placeholder="zipcode"
            type="number"
            name="zip_code"
            value={this.state.zip_code}
            variant="outlined"
            onChange={this.handleInputChangeFor('zip_code')}
          />
          <TextField
            size="small"
            placeholder="company"
            type="text"
            name="company"
            value={this.state.company}
            variant="outlined"
            onChange={this.handleInputChangeFor('company')}
          />
          <TextField
            size="small"
            placeholder="job title"
            type="text"
            name="job_title"
            value={this.state.job_title}
            variant="outlined"
            onChange={this.handleInputChangeFor('job_title')}
          />

          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                required
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                required
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="btn"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
