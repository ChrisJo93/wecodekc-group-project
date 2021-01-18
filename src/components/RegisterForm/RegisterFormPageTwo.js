import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-UI imports
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Chip,
  Box,
} from '@material-ui/core';

class RegisterFormPageTwo extends Component {
  state = {
    motivation_bio: '',
    experience_bio: '',
    background_check_permission: false,
    skills: [],
    time_slot: [],
    languages: [],
    custom_entry_skills: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    //  TODO NEED TO FINISH REGISTRATION
    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        ...this.props.store.registration.registrationReducer,
        motivation_bio: this.state.motivation_bio,
        experience_bio: this.state.experience_bio,
        background_check_permission: this.state.background_check_permission,
        skills: this.state.skills,
        time_slot: this.state.time_slot,
      },
    });
    this.props.history.push('/login-register');
  }; // end registerUser

  //go back to first page of registration
  handleBackClick = (e) => {
    this.props.history.push('/registration/page/1');
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleSwitchSkills = (skill) => {
    switch (skill) {
      case 1:
        skill = 'JavaScript';
        return skill;
      case 2:
        skill = 'CSS';
        return skill;
      case 3:
        skill = 'HTML';
        return skill;
      case 4:
        skill = 'React';
        return skill;
      case 5:
        skill = 'Angular';
        return skill;
      case 6:
        skill = 'Python';
        return skill;
      case 7:
        skill = 'C#';
        return skill;
      case 8:
        skill = 'C++';
        return skill;
      case 9:
        skill = 'C';
        return skill;
      case 10:
        skill = 'Java';
        return skill;
      case 11:
        skill = 'PostgreSQL';
        return skill;
      case 12:
        skill = 'MongoDB';
        return skill;
      default:
        break;
    }
  };

  handleSwitchLanguage = (language) => {
    switch (language) {
      case 1:
        language = 'English';
        return language;
        break;
      case 2:
        language = 'Spanish';
        return language;
        break;
      case 3:
        language = 'German';
        return language;
        break;
      case 4:
        language = 'French';
        return language;
        break;
      case 5:
        language = 'Chinese-Mandarin';
        return language;
        break;
      case 6:
        language = 'Chinese Cantonese';
        return language;
      case 7:
        language = 'Japanese';
        return language;
      case 8:
        language = 'Arabic';
        return language;
    }
  };

  handleSwitchDay = (day) => {
    switch (day) {
      case 1:
        day = 'Sunday';
        return day;
      case 2:
        day = 'Monday';
        return day;
        break;
      case 3:
        day = 'Tuesday';
        return day;
        break;
      case 4:
        day = 'Wednesday';
        return day;
        break;
      case 5:
        day = 'Thursday';
        return day;
        break;
      case 6:
        day = 'Friday';
        return day;
        break;
      case 7:
        day = 'Saturday';
        return day;
        break;
    }
  };

  render() {
    //loop through to get each language from database
    const languages = this.props.store.dropdown.languageReducer.map(
      (item, index) => {
        return (
          <MenuItem value={item.id} name={item.languages_label} key={index}>
            {item.languages_label}
          </MenuItem>
        );
      }
    );
    //loop through to get each skill from database
    const skills = this.props.store.dropdown.skillReducer.map((item, index) => {
      return (
        <MenuItem value={item.id} key={index} name={item.skills_label}>
          {item.skills_label}
        </MenuItem>
      );
    });

    //loop through to get each time slot from database
    const time = this.props.store.dropdown.timeReducer.map((item, index) => {
      return (
        <MenuItem
          value={item.id}
          key={index}
          name={item.day_name}
          name={item.time_slot_label}
        >
          {item.day_name} {item.time_slot_label}
        </MenuItem>
      );
    });

    return (
      <Container style={{ padding: '75px' }}>
        <Grid container justify="center">
          <Grid item>
            <form className="opacity" onSubmit={this.registerUser}>
              <Typography variant="h4" component="h2" gutterBottom>
                Registration
              </Typography>
              {this.props.store.errors.registrationMessage && (
                <h3 className="alert" role="alert">
                  {this.props.store.errors.registrationMessage}
                </h3>
              )}
              <Typography variant="h6" component="h3" gutterBottom>
                More Details
              </Typography>
              <Grid container></Grid>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="What motivated you to mentor with us?(300 Character Limit)"
                type="text"
                name="motivation"
                value={this.state.motivation_bio}
                required
                variant="outlined"
                onChange={this.handleInputChangeFor('motivation_bio')}
                inputProps={{ maxLength: '300' }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Do you have any previous volunteer experience with other youth serving organizations? Please give a brief description of your role and responsibilities.(300 Character Limit)"
                type="text"
                name="experience_bio"
                value={this.state.experience_bio}
                required
                variant="outlined"
                onChange={this.handleInputChangeFor('experience_bio')}
                inputProps={{ maxLength: '300' }}
              />
              <Box mb={2}>
                <FormLabel>
                  Would you be willing to complete a personal background check
                  if requested?
                </FormLabel>
                <RadioGroup
                  row
                  color="secondary"
                  required
                  onChange={this.handleInputChangeFor(
                    'background_check_permission'
                  )}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="no"
                  />
                </RadioGroup>
              </Box>
              <FormControl fullWidth variant="outlined">
                <Select
                  variant="outlined"
                  labelId="languages"
                  id="languages"
                  multiple
                  value={this.state.languages}
                  onChange={this.handleInputChangeFor('languages')}
                  // input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={this.handleSwitchLanguage(value)}
                        />
                      ))}
                    </div>
                  )}
                >
                  {languages}
                </Select>
                <InputLabel id="languages" variant="outlined">
                  What languages do you speak? If none, leave blank.
                </InputLabel>
              </FormControl>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="skills">
                  Please select any technical skills you have and would like to
                  use below. If none, leave blank.
                </InputLabel>
                <Select
                  labelId="skills"
                  id="skills"
                  multiple
                  value={this.state.skills}
                  onChange={this.handleInputChangeFor('skills')}
                  // input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={this.handleSwitchSkills(value)}
                        />
                      ))}
                    </div>
                  )}
                >
                  {skills}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Do you have any other skills you would like to add?(100 Character Limit)"
                type="text"
                name="custom_entry_skills"
                value={this.state.custom_entry_skills}
                variant="outlined"
                onChange={this.handleInputChangeFor('custom_entry_skills')}
                inputProps={{ maxLength: '100' }}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="time">
                  Please select when you are available
                </InputLabel>
                <Select
                  labelId="time"
                  id="time"
                  multiple
                  value={this.state.time_slot}
                  onChange={this.handleInputChangeFor('time_slot')}
                  // input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip key={value} label={this.handleSwitchDay(value)} />
                      ))}
                    </div>
                  )}
                >
                  {time}
                </Select>
              </FormControl>
              <Box m={2}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={this.handleBackClick}
                  // name="submit"
                  // value="Register"
                >
                  Back
                </Button>
                &nbsp;
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  // name="submit"
                  // value="Register"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(RegisterFormPageTwo));
