import React, { useEffect, useState,  useRef, act } from 'react';
import './App.css'


function App() {

  return (
    <VideoFeed/>
  )
}




const VideoFeed = () => {

  const [active, setAcitve] = useState(1);

  const videoArray = [
    { id: 1, name:'cam1', imgSrc: 'http://localhost:5000/video_feed/1' },
    { id: 2, name:'cam2', imgSrc: 'http://localhost:5000/video_feed/2' },
    { id: 3, name:'cam3', imgSrc: 'http://localhost:5000/video_feed/3' },
    { id: 4, name:'cam4', imgSrc: 'http://localhost:5000/video_feed/4' },
    { id: 5, name:'cam5', imgSrc: 'http://localhost:5000/video_feed/4' },
    { id: 6, name:'cam6', imgSrc: 'http://localhost:5000/video_feed/4' },
];

  return (
    <div className='videos'>
      {videoArray.map((vdo)=>{
        return(
          <div 
            className= {(active===vdo.id)?"vdo-wrap active":"vdo-wrap"}
            key = {vdo.id}
            >
              <img
                src={vdo.imgSrc}
                alt=""
                onClick={()=>setAcitve(vdo.id)}

              />
              <p>{vdo.name}</p>
          </div>
        )
      })
      }

      <div className="data">
        placeholder for data
      </div>
      
    </div>
  );
};




export default App
