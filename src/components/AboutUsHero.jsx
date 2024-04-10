import React, { useRef } from 'react';
import gsap from 'gsap';
import { highTechVideo } from '../utils';
import { hightechpictureV1 } from '../utils';
const AboutUsHero = () => {
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    // Restart the video when it ends
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <section style={{ width: '100%', position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            autoPlay
            muted
            playsInline={true}
            key={highTechVideo}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            loop
            ref={videoRef}
            onEnded={handleVideoEnded}
          >
            <source src={highTechVideo} type="video/mp4" />
          </video>
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              textAlign: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            <p>YOUR TEXT OVERLAY HERE</p>
          </div>
        </div>
      </div>
      <img src={hightechpictureV1} alt="test" style={{ width: '100%' }} />
    </section>
  );
};

export default AboutUsHero;
