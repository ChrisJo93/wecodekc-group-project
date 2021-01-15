const verifiedUserDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_VERIFIED_USER_DETAIL':
      return action.payload;
    case 'RESET_VERIFIED_USER_DETAIL':
      return state;
    default:
      return state;
  }
};

export default verifiedUserDetailReducer;
