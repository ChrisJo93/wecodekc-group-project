const unverifiedUsers = (state = [], action) => {
  if (action.type === 'SET_UNVERIFIED_USERS') {
    return action.payload;
  } else {
    return state;
  }
};

// user will be on the redux state at:
// state.user
export default unverifiedUsers;
