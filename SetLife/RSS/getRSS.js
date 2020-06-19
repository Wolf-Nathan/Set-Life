// RSS/getRSS.js

import * as rssParser from 'react-native-rss-parser';

export default async function getRSS() {
  try {
    const response = await fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss', {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/html, application/xhtml+xml, application/xml',

      },
      // sendHeadersToHosts: ['http://feeds.bbci.co.uk/news/world/rss.xml']
    });
    console.log(response);
    const result = await response.text();
    console.log(result);
    const rss = await rssParser.parse(result);
    console.log(`title : ${rss.title}`);
    console.log(`items : ${rss.items.length}`);
    return rss;
  } catch (err) {
    console.error('RSS not found');
    console.error(err);
    return null;
  }

  // allowUniversalAccessFromFileURLs= true;
  // await fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss', {mode: "cors", headers: new Headers({'Access-Control-Allow-Origin' : '*'})})
  // .setHeader('Access-Control-Allow-Origin', '*')

  /* then((response) => response.text())
       .then((responseData) => rssParser.parse(responseData))
       .then((rss) => {
           console.log('title :' + rss.title);
           console.log('items :' + rss.items.length);
       }); */

  // eslint-disable-next-line no-undef

  /* await fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss', { mode: 'no-cors' })
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      console.log(rss.title);
      console.log(rss.items.length);
    });
  return null; */
}
