import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Button,
  Chip,
} from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    sex: '',
    race: [],
    email: '',
    phone_number: '',
    zip_code: '',
    company: '',
    job_title: '',
    education_level: [],
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
    // const level = this.props.store.educationReducer.map((item, index) => {
    //   return (
    //     <MenuItem value={item.id} key={index}>
    //       {item.day}
    //     </MenuItem>
    //   );
    // });
    // const race = this.props.store.raceReducer.map((item, index) => {
    //   return (
    //     <MenuItem value={item.id} key={index}>
    //       {item.day}
    //     </MenuItem>
    //   );
    // });
    return (
      <div>
        <form className="formPanel" onSubmit={this.registerUser}>
          <Typography variant="h3" component="h2" gutterBottom>
            Register User
          </Typography>
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
          <TextField
            id="birth_date"
            label="birth_date"
            type="date"
            defaultValue="2000-01-01"
            size="small"
            variant="outlined"
          />
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sex">Sex</InputLabel>
            <Select
              labelId="sex"
              id="sex"
              value={this.state.sex}
              onChange={this.handleInputChangeFor('sex')}
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
          {/* <FormControl>
            <InputLabel id="education_level">Chip</InputLabel>
            <Select
              labelId="education_level"
              id="education_level"
              multiple
              value={this.state.education_level}
              onChange={this.handleInputChangeFor('education_level')}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
              // MenuProps={MenuProps}
            >
              {level}
            </Select>
          </FormControl> */}
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
            <TextField
              placeholder="create username"
              type="text"
              name="username"
              variant="outlined"
              size="small"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
          <div>
            <TextField
              placeholder="create password"
              type="password"
              name="password"
              variant="outlined"
              size="small"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div>
            <Button
              variant="outlined"
              type="submit"
              // name="submit"
              // value="Register"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
