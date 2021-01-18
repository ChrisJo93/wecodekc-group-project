const eventDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EVENT_DETAILS':
      return action.payload[0];
    default:
      return state;
  }
};

export default eventDetailReducer;
