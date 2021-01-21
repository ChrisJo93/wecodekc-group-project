const verifiedUserDetailAll = (state = [], action) => {
  switch (action.type) {
    case 'SET_VERIFIED_USER_ALL_DETAIL':
      return action.payload;
    case 'RESET_VERIFIED_USER_ALL_DETAIL':
      return state;
    default:
      return state;
  }
};

export default verifiedUserDetailAll;
