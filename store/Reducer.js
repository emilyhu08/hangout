export const initialState = {
  search: '',
  activities: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_SEARCH':
      return {
        ...state,
        search: action.item,
      };

    case 'ADD_TO_ACTIVITIES':
      return {
        ...state,
        activities: action.item,
      };

    default:
      return state;
  }
};

export default reducer;
