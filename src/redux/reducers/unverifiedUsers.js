const unverifiedUsers = (state = [], action) => {
  console.log('in all unverifiedUsers with', action.payload);
  if (action.type === 'SET_UNVERIFIED_USERS') {
    return action.payload;
  } else {
    return state;
  }
};

// user will be on the redux state at:
// state.user
export default unverifiedUsers;
