import { createStore, combineReducers } from 'redux';
// import toggleFavorite from '../Reducer/favoriteReducer';
import settingsReducer from '../Reducer/settingsReducer';
import taskReducer from '../Reducer/taskReducer';

export default createStore(
  combineReducers({
    settings: settingsReducer,
    task: taskReducer,
  }),
);
