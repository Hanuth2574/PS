import React from 'react';
import Lottie from 'lottie-react';
import animationData from './animation1.json';

function Mation() {
  return (
    <div>

    <div style={{height:"80px",width:"80px"}}>
        <Lottie animationData={animationData} />
      </div>
    </div>
    
      
    
  );
}

export default Mation;
