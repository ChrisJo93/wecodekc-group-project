const demographicsSelection = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTION_DEMOGRAPHICS':
      return action.payload;
    default:
      return state;
  }
};

export default demographicsSelection;
