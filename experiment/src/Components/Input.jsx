import React from 'react';
import Data from './bgg.mp4';

function Input() {
  return (
    <div>
      <video src={Data} autoPlay loop muted width="640" height="360" >
        
      </video>
      <div className='text' style={{mixBlendMode:"multiply",position:"absolute",background:"#000",color:"#fff",fontSize:"100px",top:50,left:20}}>
        <h1>Hellow orld</h1>
      </div>
    </div>
  );
}

export default Input;
