import React from 'react';
import chroma from 'chroma-js';
import _ from 'underscore';
import './big-image.css';

function BigImage({ colors, imgUrl }) {
  return (
    <div className='big-img-holder'>
      <img className='big-image' src={imgUrl}></img>
      <div className='palette'>
        {colors.map(c => <PaletteColor color={c} />)}
      </div>
    </div >
  );
}

function PaletteColor({ color }) {
  const { r, g, b } = color;
  const hex = chroma(r, g, b).hex();
  return <div className='palette-color' style={{ backgroundColor: hex }}></div>
}

export default BigImage;
