import { createStore, combineReducers } from 'redux';
// import toggleFavorite from '../Reducer/favoriteReducer';
import settingsReducer from '../Reducer/settingsReducer';
import taskReducer from '../Reducer/taskReducer';
import rssReducer from '../Reducer/rssReducer';

export default createStore(
  combineReducers({
    settings: settingsReducer,
    task: taskReducer,
    rss: rssReducer,
  }),
);
