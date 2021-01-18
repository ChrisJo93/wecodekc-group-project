const repeatEventReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_REPEAT_EVENTS':
      return action.payload;
    default:
      return state;
  }
};

export default repeatEventReducer;
