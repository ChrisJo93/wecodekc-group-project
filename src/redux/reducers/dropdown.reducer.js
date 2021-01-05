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

const raceReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RACE':
      return action.payload;
    case 'UNSET_RACE':
      return [];
    default:
      return state;
  }
};

const sexReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEX':
      return action.payload;
    case 'UNSET_SEX':
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

export default combineReducers({
  educationReducer,
  sexReducer,
  raceReducer,
  skillReducer,
});
