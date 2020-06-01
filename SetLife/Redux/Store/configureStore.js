import { createStore } from 'redux';
import toggleFavorite from '../Reducer/favoriteReducer';

export default createStore(toggleFavorite);
