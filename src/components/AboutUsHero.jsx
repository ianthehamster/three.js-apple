import React, { useRef } from 'react';
import gsap from 'gsap';
import { aboutUsSection2, aboutUsSection3, highTechVideo } from '../utils';
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
            <p
              style={{
                color: '#fff',
                textShadow:
                  '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 55px #ff00de, 0 0 75px #ff00de',
              }}
            >
              One Stop Hub <br /> <br /> For the Products of Tomorrow
            </p>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <img src={aboutUsSection2} alt="section-2" style={{ width: '100%' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            textAlign: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          <p
            style={{
              color: '#fff',
              textShadow:
                '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 55px #ff00de, 0 0 75px #ff00de',
            }}
          >
            With our amazing collection, you can find your tech product that
            suits your needs
          </p>
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <img src={aboutUsSection3} alt="section-2" style={{ width: '100%' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            textAlign: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          <p
            style={{
              color: '#fff',
              textShadow:
                '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 55px #ff00de, 0 0 75px #ff00de',
            }}
          >
            Never miss our store update! Subscribe to our mailing list here!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
