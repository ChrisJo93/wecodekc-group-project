const ethnicity = (state = [], action) => {
  switch (action.type) {
    case 'SET_ETHNICITY':
      return action.payload;
    default:
      return state;
  }
};

export default ethnicity;
