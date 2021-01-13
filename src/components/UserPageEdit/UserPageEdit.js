import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Button,
  Chip,
  Grid,
  Box,
  LinearProgress,
} from '@material-ui/core';
import ImageUpload from '../ImageUpload/ImageUpload';

class UserPageEdit extends Component {
  state = {
    first_name: this.props.store.user.first_name,
    last_name: this.props.store.user.last_name,
    zip_code: this.props.store.user.zip_code,
    phone_number: this.props.store.user.phone_number,
    email: this.props.store.user.email,
    skills: [this.props.store.user.skills],
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handlePhoneChange = (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length < 10) {
      this.setState({ phone_number: onlyNums });
    } else if (onlyNums.length === 10) {
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      this.setState({ phone_number: number });
    }
  };

  handleZipChange = (event) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length < 5) {
      this.setState({ zip_code: onlyNums });
    } else if (onlyNums.length === 5) {
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      this.setState({ zip_code: number });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch({ type: 'PUT_USER', payload: this.state });
  };

  render() {
    //loop through to get each skill from database
    const skills = this.props.store.dropdown.skillReducer.map((item, index) => {
      return (
        <MenuItem value={item.id} key={index}>
          {item.skills_label}
        </MenuItem>
      );
    });
    return this.props.store.user !== undefined ? (
      //displays the edit form if user info is loaded

      <div>
        <ImageUpload />
        <div className="profile-area">
          <form onSubmit={this.handleSubmit}>
            <Box mb={2}>
              <div>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="first name"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  // required
                  variant="outlined"
                  onChange={this.handleInputChangeFor('first_name')}
                />
              </div>
            </Box>

            <Box mb={2}>
              <div>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="last name"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  // required
                  variant="outlined"
                  onChange={this.handleInputChangeFor('last_name')}
                />
              </div>
            </Box>
            <Box mb={2}>
              <div>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="zipcode"
                  type="number"
                  name="zip_code"
                  value={this.state.zip_code}
                  variant="outlined"
                  onChange={this.handleZipChange}
                />
              </div>
            </Box>
            <Box mb={2}>
              <div>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="phone number"
                  type="text"
                  name="phone_number"
                  value={this.state.phone_number}
                  variant="outlined"
                  onChange={this.handlePhoneChange}
                />
              </div>
            </Box>
            <Box mb={2}>
              <div>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  variant="outlined"
                  onChange={this.handleInputChangeFor('email')}
                />
              </div>
            </Box>

            <FormControl variant="outlined" fullWidth>
              <InputLabel id="skills">Edit your skills</InputLabel>
              <Select
                labelId="skills"
                id="skills"
                multiple
                value={this.state.skills}
                onChange={this.handleInputChangeFor('skills')}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {skills}
              </Select>
            </FormControl>
            <Box mb={2}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                // onClick={this.props.edit}
              >
                Update Profile
              </Button>
            </Box>
          </form>
        </div>
      </div>
    ) : (
      <LinearProgress color="secondary" />
    );
  }
}

export default connect(mapStoreToProps)(UserPageEdit);
