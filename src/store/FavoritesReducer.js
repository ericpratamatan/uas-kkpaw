const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || []
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const newFavoritesAdd = [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(newFavoritesAdd));
      return {
        ...state,
        favorites: newFavoritesAdd
      };
    case 'REMOVE_FAVORITE':
      const newFavoritesRemove = state.favorites.filter(book => book.key !== action.payload.key);
      localStorage.setItem('favorites', JSON.stringify(newFavoritesRemove));
      return {
        ...state,
        favorites: newFavoritesRemove
      };
    default:
      return state;
  }
};

export default favoritesReducer;