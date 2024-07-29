import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import logger from './logger';
import favoritesReducer from './FavoritesReducer';

const rootReducer = combineReducers({
    favorites: favoritesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;