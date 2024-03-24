import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from '@react-three/drei';

import * as THREE from 'three';
import Lights from './Lights';
import { Suspense } from 'react';
import IPhone from './IPhone';
import AlienwareLaptop from './AlienwareLaptop';
import Loader from './Loader';
import { hourglass } from 'ldrs';
import CyberpunkTablet from './CyberpunkTablet';
import AppleVisionPro from './AppleVisionPro';
import { Apple } from '@mui/icons-material';

hourglass.register();

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
  modelState,
}) => {
  console.log(modelState);
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
      style={modelState === 'laptop' ? { height: '130%' } : null}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      {modelState === 'laptop' ? (
        <PerspectiveCamera makeDefault position={[4, 2, 7]} />
      ) : modelState === 'tablet' ? (
        <PerspectiveCamera makeDefault position={[-300, 50, 230]} />
      ) : modelState === 'accessories' ? (
        <PerspectiveCamera makeDefault position={[0.2, 0.2, 0.3]} />
      ) : (
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      )}
      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large'`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          {modelState === 'laptop' ? (
            <AlienwareLaptop />
          ) : modelState === 'tablet' ? (
            <CyberpunkTablet />
          ) : modelState === 'accessories' ? (
            <AppleVisionPro />
          ) : (
            <IPhone
              scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
              item={item}
              size={size}
            />
          )}
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
