import React, { useState } from 'react';
import './app.css';
import Navbar from './components/Navbar';
import BigImage from './components/BigImage';
import Graph from './components/Graph';
import SmallImage from './components/SmallImage';

// const dogs = ['https://static.scientificamerican.com/blogs/cache/file/BB6F1FE0-4FDE-4E6E-A986664CE30602E4_source.jpg?w=590&h=800&2F8476C1-DF14-49BA-84FFE94218CC4933']
const pic = 'https://image.businessinsider.com/5dd3ad2c7eece57cd401f673?width=1100&format=jpeg&auto=webp'
const name = 'elonmusk'
const rgb = { r: 0, g: 0, b: 0 };

function App() {
  return (
    <div className='flex-container'>
      <Navbar img={pic} name={name} />
      <div className='main-container'>
        <BigImage colors={[rgb, rgb, rgb, rgb ,rgb]} imgUrl={pic} />
        <SmallImage images={}></SmallImage>
        <Graph imgUrl={pic} ></Graph>
      </div>
    </div>
  );
}
    
export default App;
