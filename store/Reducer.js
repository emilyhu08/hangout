export const initialState = {
  search: '',
  activities: null,
  emailState: null,
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

    case 'ADD_TO_EMAIL':
      return {
        ...state,
        emailState: action.item,
      };

    default:
      return state;
  }
};

export default reducer;
