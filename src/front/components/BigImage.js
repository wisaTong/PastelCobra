import React, { useEffect, useState } from 'react';
import chroma from 'chroma-js';
import axios from 'axios';
import _ from 'underscore';
import './big-image.css';

function BigImage({ imgUrl }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/v1/upload/arbitary?imgUrl=' + imgUrl)
      .then(res => setColors(_.rest(res.data.colors.reverse(), -6)))
  }, [])

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
