import React, { useEffect, useState, useRef, act } from 'react';
import io from 'socket.io-client';
import './App.css'




function App() {
  
  return (
    <>
      <div className="head">
        <img src="/logo.png" height='60px' alt="" />
      </div>

      <VideoFeed />
    </>
  )
}




const VideoFeed = () => {
  
  const [active, setAcitve] = useState(1);
  
  
  const videoArray = [
    { id: 1, name: 'cam1', imgSrc: 'http://localhost:5000/video_feed/1' },
    { id: 2, name: 'cam2', imgSrc: 'http://localhost:5000/video_feed/2' },
    { id: 3, name: 'cam3', imgSrc: 'http://localhost:5000/video_feed/3' },
    { id: 4, name: 'cam4', imgSrc: 'http://localhost:5000/video_feed/4' },
    { id: 5, name: 'cam5', imgSrc: 'http://localhost:5000/video_feed/4' },
    { id: 6, name: 'cam6', imgSrc: 'http://localhost:5000/video_feed/4' },
  ];
  
  return (
    <div className='videos'>
      {videoArray.map((vdo) => {
        return (
          <div
          className={(active === vdo.id) ? "vdo-wrap active" : "vdo-wrap"}
            key={vdo.id}
          >
            <img
              src={vdo.imgSrc}
              alt=""
              onClick={() => setAcitve(vdo.id)}

              />
            <p>{vdo.name}</p>
          </div>
        )
      })
    }
      <DriveDiv/>
      <ArmDiv/>
    </div>
  );
};


const socket = io('http://localhost:3000'); // Adjust this URL if needed


function DriveDiv() {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    socket.emit('front-end-connection', 'front-end client connected');

    socket.on('drive-client', (msg) => {
      setMessages((prevMessages) => {
        let newArray = [...prevMessages, msg].slice(-5);
        console.log(newArray);
        return newArray;
      });
    });

    return () => {
      socket.off('drive-client');
    };
  }, []);

  return (
    <div className="data drive-data">
      {
        messages.map((msg, i) => {
          return (
            <p key={i}>{msg}</p>
          )
        })
      }
    </div>
  )
}


function ArmDiv() {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    socket.emit('front-end-connection', 'front-end client connected');

    socket.on('arm-client', (msg) => {
      setMessages((prevMessages) => {
        let newArray = [...prevMessages, msg].slice(-5);
        console.log(newArray);
        return newArray;
      });
    });

    return () => {
      socket.off('arm-client');
    };
  }, []);

  return (
    <div className="data arm-data">
      {
        messages.map((msg, i) => {
          return (
            <p key={i}>{msg}</p>
          )
        })
      }
    </div>
  )
}




export default App
