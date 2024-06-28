import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './animation.json'; // Replace with the path to your Lottie animation JSON file

const BackgroundAnimation = ({ children }) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy(); // Clean up on unmount
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div ref={animationContainer} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, textAlign: 'center', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
