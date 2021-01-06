import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
  Grid,
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
    user_password: '',
  };

  componentDidMount() {
    //dispatch to get all education levels for dropdown
    this.props.dispatch({ type: 'GET_EDUCATION' });
  }

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        user_password: this.state.user_password,
      },
    });
  }; // end registerUser

  //go to next page of registration
  handleNextClick = (e) => {
    this.props.history.push('/registration/page/2');
  };

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
        <form className="formPanel" onSubmit={this.handleNextClick}>
          <Typography variant="h3" component="h2" gutterBottom>
            Mentor Registration
          </Typography>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}
          <Typography variant="h6" component="h3" gutterBottom>
            Personal Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <TextField
                size="small"
                placeholder="first name"
                type="text"
                name="first_name"
                value={this.state.first_name}
                // required
                variant="outlined"
                onChange={this.handleInputChangeFor('first_name')}
              />
              <TextField
                size="small"
                placeholder="middle name/initial"
                type="text"
                name="middle_name"
                value={this.state.first_name}
                // required
                variant="outlined"
                onChange={this.handleInputChangeFor('middle_name')}
              />
              <TextField
                size="small"
                placeholder="last name"
                type="text"
                name="last_name"
                value={this.state.first_name}
                // required
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
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="Race">Race</InputLabel>
                <Select
                  labelId="race"
                  id="race"
                  value={this.state.sex}
                  onChange={this.handleInputChangeFor('race')}
                  label="race"
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
                placeholder="create username"
                type="text"
                name="username"
                variant="outlined"
                size="small"
                value={this.state.username}
                // required
                onChange={this.handleInputChangeFor('username')}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
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

              <TextField
                placeholder="create password"
                type="password"
                name="password"
                variant="outlined"
                size="small"
                value={this.state.user_password}
                // required
                onChange={this.handleInputChangeFor('user_password')}
              />

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
            </Grid>
          </Grid>
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

export default withRouter(connect(mapStoreToProps)(RegisterForm));
