import _ from 'underscore';
import { computeAverageColor, imgDataFromUrl, collectPixels } from '../util/image';

const DIMENSION_MAX = 256;

export function getKeyForPixel(pixel, bucketsPerDimension) {
  let bucketSize = DIMENSION_MAX / bucketsPerDimension;
  let redBucket = Math.floor(pixel.r / bucketSize);
  let greenBucket = Math.floor(pixel.g / bucketSize);
  let blueBucket = Math.floor(pixel.b / bucketSize);
  let key = redBucket + ":" + greenBucket + ":" + blueBucket;
  return key;
}

export function binPixels(pixels, bucketsPerDimension) {
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
    return {percent: (pixelsInBucket.length/pixels.length) * 100, ...averageColor};
  });

  return {
    buckets: sortedBuckets,
    colors: bucketColors
  };
}

export async function histrogramPixelRun(url) {
  const imgData = await imgDataFromUrl(url);
  const pixels = await collectPixels(imgData);
  return { url, ...binPixels(pixels, 3)};
}
