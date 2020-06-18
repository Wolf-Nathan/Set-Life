// RSS/getRSS.js

import * as rssParser from 'react-native-rss-parser';

export default async function getRSS() {
  // allowUniversalAccessFromFileURLs= true;
  // await fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss', {mode: "cors", headers: new Headers({'Access-Control-Allow-Origin' : '*'})})
  // .setHeader('Access-Control-Allow-Origin', '*')
  const response = await fetch('http://feeds.bbci.co.uk/news/world/rss.xml', { method: 'GET', headers: { 'Access-Control-Allow-Origin': '*' } });
  const result = await response.text();
  const rss = await rssParser.parse(result);
  console.log(`title : ${rss.title}`);
  console.log(`items : ${rss.items.length}`);
  /* then((response) => response.text())
       .then((responseData) => rssParser.parse(responseData))
       .then((rss) => {
           console.log('title :' + rss.title);
           console.log('items :' + rss.items.length);
       }); */
}
