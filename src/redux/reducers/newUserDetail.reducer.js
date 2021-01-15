const newUserDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NEW_USER_DETAIL':
      return action.payload;
    case 'RESET_NEW_USER_DETAIL':
      return state;
    default:
      return state;
  }
};

export default newUserDetailReducer;
