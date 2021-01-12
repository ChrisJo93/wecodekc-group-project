import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import dropdown from './dropdown.reducer';
import eventReducer from './event.reducer';
import registration from './registration.reducer';
import dateReducer from './dateModal.reducer';
import allUsers from './allUsers.reducer';
<<<<<<< HEAD
import imagesReducer from './image.reducer';
=======
import unverifiedUsers from './unverifiedUsers';
>>>>>>> develop

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  dateReducer,
  dropdown,
  errors, // contains registrationMessage and loginMessage
  eventReducer,
  allUsers,
  unverifiedUsers,
  registration, //gathers reg information together
  user, // will have an id and username if someone is logged in
  imagesReducer, //getting all images from images table (AWS links)
});

export default rootReducer;
