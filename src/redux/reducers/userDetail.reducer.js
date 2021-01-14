const userDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_DETAIL':
      return action.payload;
    default:
      return state;
  }
};

export default userDetailReducer;
