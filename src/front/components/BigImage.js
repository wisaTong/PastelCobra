import React from 'react';
import chroma from 'chroma-js';
import _ from 'underscore';
import './big-image.css';

function BigImage({ colors, imgUrl }) {
  return (
    <div className='big-img-holder'>
      <div className='big-image'>
        <img className='big-image' src={imgUrl}></img>
        <div className='palette'>
          {colors.map(c => <PaletteColor color={c} />)}
        </div>
      </div>
      <div className='palette-hilight'>
        {colors.map(c => <HilightBubble color={c} />)}
      </div>
    </div >
  );
}

function PaletteColor({ color }) {
  const { r, g, b } = color;
  const hex = chroma(r, g, b).hex();
  return <div className='palette-color' style={{ backgroundColor: hex }}></div>
}

function HilightBubble({ color }) {
  const { percent, r, g, b } = color;
  const hex = chroma(r, g, b).hex();
  return (
    <div className='bubble-container'>
      <dic className='bubble' style={{ backgroundColor: hex }}></dic>
      <p>{hex}</p>
      <p>{Math.round(percent * 100) / 100}%</p>
    </div>
  )
}

export default BigImage;
