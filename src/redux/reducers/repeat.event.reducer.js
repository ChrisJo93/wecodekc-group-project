const repeatEventReducer = (state = [], action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'SET_REPEAT_EVENTS':
      return action.payload;
    default:
      return state;
  }
};

export default repeatEventReducer;
