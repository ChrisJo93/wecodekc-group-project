const eventDetailReducer = (state = {}, action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'SET_EVENT_DETAILS':
      return action.payload[0];
    default:
      return state;
  }
};

export default eventDetailReducer;
