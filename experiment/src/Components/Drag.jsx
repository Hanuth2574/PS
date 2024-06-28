import React from 'react'
import Lottie from 'lottie-react'
import animationData from './animation2.json'
function Drag() {
  return (
    <div style={{position:"absolute" , height:"70px",width:"70px",marginRight:"680px",marginBottom:"20px"}}>
      
      <Lottie animationData={animationData}/>
    </div>
  )
}

export default Drag