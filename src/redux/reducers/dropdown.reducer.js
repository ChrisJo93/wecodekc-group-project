import { combineReducers } from 'redux';

const educationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDUCATION':
      return action.payload;
    case 'UNSET_EDUCATION':
      return [];
    default:
      return state;
  }
};

const ethnicityReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ETHNICITY':
      return action.payload;
    case 'UNSET_ETHNICITY':
      return [];
    default:
      return state;
  }
};

const genderReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENDER':
      return action.payload;
    case 'UNSET_GENDER':
      return [];
    default:
      return state;
  }
};

const skillReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SKILL':
      return action.payload;
    case 'UNSET_SKILL':
      return [];
    default:
      return state;
  }
};

const timeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TIME':
      return action.payload;
    case 'UNSET_TIME':
      return [];
    default:
      return state;
  }
};

const languageReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.payload;
    case 'UNSET_LANGUAGE':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  educationReducer,
  genderReducer,
  ethnicityReducer,
  skillReducer,
  timeReducer,
  languageReducer,
});
