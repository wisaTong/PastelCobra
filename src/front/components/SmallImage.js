import React, { useState } from 'react';
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
      { overlay
        ? <Overlay imgUrl={imgUrl} callback={() => setOverlay(false)} />
        : null
      }
      <img className='image' src={imgUrl} onClick={() => setOverlay(true)}></img>
    </div>
  )
}

function Overlay({ callback, imgUrl }) {
  return (
    <div className='overlay' onClick={callback}>
      <img src={imgUrl}></img>
    </div>
  )
}

export default SmallImage;
