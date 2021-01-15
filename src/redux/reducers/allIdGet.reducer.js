const allIdGet = (state = [], action) => {
  console.log(action.payload);
  if (action.type === 'SET_ALL_ID') {
    return action.payload;
  } else {
    return state;
  }
};

// user will be on the redux state at:
// state.user
export default allIdGet;
