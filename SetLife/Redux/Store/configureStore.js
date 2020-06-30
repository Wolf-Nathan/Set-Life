import { createStore, combineReducers } from 'redux';
import settingsReducer from '../Reducer/settingsReducer';
import taskReducer from '../Reducer/taskReducer';
import rssReducer from '../Reducer/rssReducer';
import loginReducer from '../Reducer/loginReducer';

export default createStore(
  combineReducers({
    settings: settingsReducer,
    task: taskReducer,
    rss: rssReducer,
    login: loginReducer,
  }),
);
