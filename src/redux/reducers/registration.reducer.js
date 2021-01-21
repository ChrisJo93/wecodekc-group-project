import { combineReducers } from 'redux';

const registrationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return action.payload;
    default:
      return state;
  }
};

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_LOGIN':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  registrationReducer,
  loginReducer,
});
