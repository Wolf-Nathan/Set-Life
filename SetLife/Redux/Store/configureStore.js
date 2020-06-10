import { createStore, combineReducers } from 'redux';
// import toggleFavorite from '../Reducer/favoriteReducer';
import settingsReducer from '../Reducer/settingsReducer';

export default createStore(
  combineReducers({
    settings: settingsReducer,
  }),
);
