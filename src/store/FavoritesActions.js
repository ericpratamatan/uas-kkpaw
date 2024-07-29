export const addFavorite = (book) => {
  return {
    type: 'ADD_FAVORITE',
    payload: book,
  };
};

export const removeFavorite = (book) => {
  return {
    type: 'REMOVE_FAVORITE',
    payload: book,
  };
};
