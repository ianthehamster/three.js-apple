import { heroVideo, smallHeroVideo } from '../utils';
import { useState } from 'react';
import { useEffect } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo,
  );

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet);
    };
  }, []);

  return (
    <section
      className="w-full nav-height relative"
      style={{ backgroundColor: 'black' }}
    >
      <div
        className="h-5/6 w-full flex-center flex-col"
        style={{ backgroundColor: 'black' }}
      >
        <div className="md:w-10/12 w-9/12" style={{ width: '100%' }}>
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default Hero;
