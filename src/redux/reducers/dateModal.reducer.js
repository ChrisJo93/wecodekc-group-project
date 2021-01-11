const dateReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DATES':
      return action.payload;
    case 'UNSET_DATES':
      return [];
    default:
      return state;
  }
};

export default dateReducer;
