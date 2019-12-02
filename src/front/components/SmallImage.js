import React, { useState, useEffect } from 'react';
import { plotOriginalData } from '../../util/histogramPlotter';
import axios from 'axios';
import querysting from 'querystring';
import _ from 'underscore';
import './small-image.css';

function SmallImage({ images }) {
  return (
    <div className='small-img-container'>
      {images.map(i => <Image imgUrl={i}></Image>)}
    </div>
  );
}

function Image({ imgUrl }) {
  const [overlay, setOverlay] = useState(false);

  return (
    <div className='image-frame'>
      {overlay
        ? <Overlay imgUrl={imgUrl} callback={() => setOverlay(false)} />
        : null
      }
      <img className='image' src={imgUrl} onClick={() => setOverlay(true)}></img>
    </div>
  )
}

function Overlay({ callback, imgUrl }) {
  const [buckets, setBuckets] = useState(null);

  if (buckets) plotOriginalData(histogram, _.flatten(buckets.buckets));

  useEffect(() => {
    axios.get('http://localhost:3000/v1/upload/arbitary?' + querysting.stringify({ imgUrl: imgUrl }))
      .then(res => setBuckets(res.data))
  }, [])

  return (
    <div className='overlay'>
      <img className='image-overlay' src={imgUrl}></img>
      <div id='histogram'></div>
      <button className='close-button' onClick={callback}>X</button>
    </div>
  )
}

export default SmallImage;
