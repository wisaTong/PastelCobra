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
const TOKEN = 'IGQVJYLXBCaGhWbXhvWENmVnY1OTlPMGlLMjFKeEpKMDUzaDF4ZA05OWnZATRzhCM29xV2dkSUhMMW1vVnFEZAnFqTVNKZAkJCQmtvbjdMOE9GYTdWWXJvUWpqc2ZAsc0dTb25iemx2dXNFeEtnaW9uUWhJN3ZAvS2hFNUhYZA3pN';
const name = 'elonmusk'
const rgb = { r: 0, g: 0, b: 0 };

function App() {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/v1/ig/medias?access_token=' + TOKEN)
      .then(res => setBuckets(res.data))
  }, [])

  return (
    <div className='flex-container'>
      { buckets.length > 0
        ? <>
          <Navbar img={pic} name={name} />
          <div className='main-container'>
            <BigImage colors={_.rest(buckets[0].colors.reverse(), -5)} imgUrl={buckets[0].url} />
            <SmallImage images={buckets.map(b => b.url)}></SmallImage>
            <Graph imgUrl={pic} ></Graph>
          </div>
        </>
        : <LoadingOverlay message="loading..."/>}
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


export default App;
