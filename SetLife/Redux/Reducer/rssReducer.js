// Reducer/rssReducer.js

import getRSS from '../../RSS/getRSS';

const initialState = { rss: getRSS() };

/**
 * Function manage rssReducer.
 * @param state
 * @param action
 * @returns {{rss: Promise<*|null|undefined>}}
 */
function toggleRSS(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default toggleRSS;
