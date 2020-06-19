// Reducer/rssReducer.js

import getRSS from '../../RSS/getRSS';

const initialState = { rss: getRSS() };

function toggleRSS(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default toggleRSS;
