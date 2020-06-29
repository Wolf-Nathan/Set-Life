// RSS/getRSS.js

import * as rssParser from 'react-native-rss-parser';

/**
 * Async function load a feed of RSS.
 * @returns {Promise<null|any>}
 */
export default async function getRSS() {
  try {
    // eslint-disable-next-line no-undef
    const response = await fetch('https://www.spiegel.de/international/index.rss', {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/html, application/xhtml+xml, application/xml',

      },
    });
    const result = await response.text();
    const rss = await rssParser.parse(result);
    return rss;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('RSS not found');
    // eslint-disable-next-line no-console
    console.error(err);
    return null;
  }
}
