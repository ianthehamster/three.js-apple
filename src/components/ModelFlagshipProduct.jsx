import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ModelView from './ModelView';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { TABLETS, PHONES, ACCESSORIES, LAPTOPS } from '../constantVariables';

const ModelFlagshipLaptop = ({ modelState }) => {
  const tl = gsap.timeline();

  useGSAP(() => {
    gsap.to('#heading', {
      y: 0,
      opacity: 1,
    });
  }, [modelState]);

  return (
    <section className="common-padding" style={{ paddingBottom: '1px' }}>
      <div className="screen-max-width">
        {modelState === `${LAPTOPS}` ? (
          <h1 id="heading" className="section-heading" style={{ opacity: '0' }}>
            Our Flagship Product: Alienware Laptop
          </h1>
        ) : null}
        {modelState === `${TABLETS}` ? (
          <h1 id="heading" className="section-heading" style={{ opacity: '0' }}>
            Our Flagship Product: Cyberpunk Tablet
          </h1>
        ) : null}
        {modelState === `${ACCESSORIES}` ? (
          <h1 id="heading" className="section-heading" style={{ opacity: '0' }}>
            Our Flagship Product: Pear Vision Pro
          </h1>
        ) : null}
        {modelState === `${PHONES}` ? (
          <h1 id="heading" className="section-heading" style={{ opacity: '0' }}>
            Our Flagship Product: Pear IPhone X
          </h1>
        ) : null}
        {/* Same as in ModelView, this could be done better! */}

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView index={1} gsapType="view1" modelState={modelState} />

            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelFlagshipLaptop;
