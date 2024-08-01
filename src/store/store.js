import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import logger from './logger';
import favoritesReducer from './FavoritesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;