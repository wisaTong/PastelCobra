import React, { useState } from 'react';
import './app.css'; 
import Header from './Header.js';

// const dogs = ['https://static.scientificamerican.com/blogs/cache/file/BB6F1FE0-4FDE-4E6E-A986664CE30602E4_source.jpg?w=590&h=800&2F8476C1-DF14-49BA-84FFE94218CC4933']
const pic = 'https://image.businessinsider.com/5dd3ad2c7eece57cd401f673?width=1100&format=jpeg&auto=webp'
const name = 'elonmusk'

function App() {
  const [msgs, setMsgs] = useState([1, 2, 3]);

  return (
    <div class='flex-container'>
      <Header img={pic} name={name}/>
    </div>
  );
}

// function BigBox(props) {
//   console.log(props.shit);
//   return (
//     <div>
//       {props.imgs.map(url => <img src={url}></img>)}
//     </div>
//   );
// }

export default  App;
