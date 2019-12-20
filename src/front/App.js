import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'underscore';
import Navbar from './components/Navbar';
import BigImage from './components/BigImage';
import Graph from './components/Graph';
import SmallImage from './components/SmallImage';
import './app.css';

// const dogs = ['https://static.scientificamerican.com/blogs/cache/file/BB6F1FE0-4FDE-4E6E-A986664CE30602E4_source.jpg?w=590&h=800&2F8476C1-DF14-49BA-84FFE94218CC4933']
const pic = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2.alternativeto.net%2Fdist%2Fs%2Fi-love-hue_714817_full.jpg%3Fformat%3Djpg%26width%3D1200%26height%3D1200%26mode%3Dcrop&f=1&nofb=1'
// const TOKEN = 'IGQVJWNExjMk16cWlEdExaV1ZA5SHRPVk9leDJXdEItQ2NLTGZADUnVxeGpOTkxpYXJzTWJIZA0plUmJuQVhnWFdwLWtBVzFfaVFScVdyejdrOE9NRTNKSmxBLVg1YmE4ZAzJEaXFZANmVTN25ZAUTI5WkYteWlXeFB1Wnk2REln';
const TOKEN = 'IGQVJVVWoyNTZA6MDZAYU0hHeUJJeEhLREdPWTZAsZAm5ZANWlFUWV2azRUN3g1WVpmeXRBSHdYejZADYUVwVkNsRDg3QVBRcXVhN1VGNlRuTHN1cWdIUUN6YUxfTnFsazFsbnB2ZAjNyVkU0RVkxRnpLZAnUyZAnlmN1dxdlk1UmFV';
const getToken = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const result = await axios.get('https://localhost:3000/v1/auth?code=' + code);
  return result.data.access_token;
}
// const TOKEN = 'IGQVJYRGE5R1o4SVNHRExFaGRuUUZAjZA3BEWmlsWGdqRzExcHRHTWViamNUNVhQSTY4NE9WVTJIeUp4MkpTTklORHhRNXBIcjNvUDlVX2FrU25JS0NnQUJOcFlIY2U5QkJEMm81azNuUWYwUXhibHk5WmtLS1h1X1pFQUw0';
const name = 'PastelCobra'

function App() {
  const [buckets, setBuckets] = useState([]);

  useEffect(async () => {
    axios.get('https://localhost:3000/v1/ig/medias?access_token=' + await getToken())
      .then(res => setBuckets(res.data))
  }, [])

  const allPxls = _.chain(buckets)
    .map((i) => i.buckets)
    .flatten()
    .value();

  const sumBuckets = binPixels(allPxls, 3);

  return (
    <div className='flex-container'>
      {buckets.length > 0
        ? <>
          <Navbar img={pic} name={name} />
          <div className='main-container'>
            <BigImage colors={_.rest(sumBuckets.colors.reverse(), -5)} imgUrl={buckets[0].url} />
            <SmallImage images={buckets.map(b => b.url)}></SmallImage>
            <Graph imgUrl={pic} ></Graph>
          </div>
        </>
        : <LoadingOverlay message="loading..." />}
    </div>
  );
}

const LoadingOverlay = ({ message }) => {
  return (
    <div className='loading-container'>
      <div className='loader'></div>
      <p>{message}</p>
    </div>
  );
}

const DIMENSION_MAX = 256;

function getKeyForPixel(pixel, bucketsPerDimension) {
  let bucketSize = DIMENSION_MAX / bucketsPerDimension;
  let redBucket = Math.floor(pixel.r / bucketSize);
  let greenBucket = Math.floor(pixel.g / bucketSize);
  let blueBucket = Math.floor(pixel.b / bucketSize);
  let key = redBucket + ":" + greenBucket + ":" + blueBucket;
  return key;
}

function binPixels(pixels, bucketsPerDimension) {
  let bucketMap = {};
  _.each(pixels, (pixel) => {
    let key = getKeyForPixel(pixel, bucketsPerDimension);
    if (key in bucketMap) {
      bucketMap[key].push(pixel);
    } else {
      bucketMap[key] = [pixel];
    }
  });

  // sort buckets
  let buckets = _.values(bucketMap);
  let sortedBuckets = _.sortBy(buckets, (bucket) => { return bucket.length; }).reverse();

  const keys = Object.keys(bucketMap);
  let bucketColors = _.map(keys, (key, index) => {
    let pixelsInBucket = bucketMap[key];
    let averageColor = computeAverageColor(pixelsInBucket);
    return { percent: (pixelsInBucket.length / pixels.length) * 100, ...averageColor };
  });

  return {
    buckets: sortedBuckets,
    colors: bucketColors
  };
}

function computeAverageColor(pixels) {
  var totalRed = _.reduce(pixels, (m, p) => m + p.r, 0);
  var totalGreen = _.reduce(pixels, (m, p) => m + p.g, 0);
  var totalBlue = _.reduce(pixels, (m, p) => m + p.b, 0);
  return {
    r: (totalRed / pixels.length),
    g: (totalGreen / pixels.length),
    b: (totalBlue / pixels.length)
  };
}

export default App;
