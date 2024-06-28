import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import "./h.css"
const Tilt = () => {
  const tiltRef = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    return () => {
      tiltRef.current.vanillaTilt.destroy();
    };
  }, []);

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child" style={{fontSize:"10px"}}>Hello how can i help</div>
    </div>
  );
};

export default Tilt;
