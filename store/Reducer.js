export const initialState = {
  search: '',
  userInfo: null,
  activities: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_SEARCH':
      return {
        ...state,
        search: action.item,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        userInfo: action.item,
      };

    case 'ADD_TO_ACTIVITIES':
      return {
        ...state,
        activities: action.item,
      };
    // case "ADD_TO_BASKET":
    //   return {
    //     ...state,
    //     basket: [...state.basket, action.item],
    //   };

    // case "REPLACE_BASKET":
    //   return {
    //     ...state,
    //     basket: action.item,
    //   };

    // case "ADD_TO_SELECTED":
    //   return {
    //     ...state,
    //     selected: { ...state.selected, ...action.item },
    //   };

    // case "TOGGLE_WARNING":
    //   return {
    //     ...state,
    //     toggleWarning: action.item,
    //   };

    default:
      return state;
  }
};

export default reducer;
