import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'underscore';
import Navbar from './components/Navbar';
import BigImage from './components/BigImage';
import Graph from './components/Graph';
import SmallImage from './components/SmallImage';
import './app.css';

// const dogs = ['https://static.scientificamerican.com/blogs/cache/file/BB6F1FE0-4FDE-4E6E-A986664CE30602E4_source.jpg?w=590&h=800&2F8476C1-DF14-49BA-84FFE94218CC4933']
const pic = 'https://image.businessinsider.com/5dd3ad2c7eece57cd401f673?width=1100&format=jpeg&auto=webp'
const TOKEN = 'IGQVJVM3YwRGV4YnZAuUWxzUUdCLTN6c0tHQ3BzUDBnOFMzelJTQ3AzVVBlZA21EN090Q1VwNzh2dllrQV9GTlV2UjhqNDVMeVNKWWlZAalZATNkdOMmxFbEF2X1Jud0U3T1BvVE16UE1QY0ttYnhLUmJtLVMyZAjQ5TjRNQXZAj';
const name = 'elonmusk'
const rgb = { r: 0, g: 0, b: 0 };

function App() {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/v1/ig/medias?access_token=' + TOKEN)
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
