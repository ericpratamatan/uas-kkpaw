const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.some(fav => fav.key === action.payload.key)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.key !== action.payload.key),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
