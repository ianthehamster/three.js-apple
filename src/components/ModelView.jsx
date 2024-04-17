import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";

import * as THREE from "three";
import Lights from "./Lights";
import { Suspense } from "react";
import IPhone from "./IPhone";
import AlienwareLaptop from "./AlienwareLaptop";
import Loader from "./Loader";
import { hourglass } from "ldrs";
import CyberpunkTablet from "./CyberpunkTablet";
import AppleVisionPro from "./AppleVisionPro";
import IPhone13 from "./IPhone13";
import { TABLETS, PHONES, ACCESSORIES, LAPTOPS } from "../constantVariables";

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
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
      style={modelState === `${LAPTOPS}` ? { height: "130%" } : null}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      {modelState === `${LAPTOPS}` ? (
        <PerspectiveCamera makeDefault position={[4, 2, 7]} />
      ) : modelState === `${TABLETS}` ? (
        <PerspectiveCamera makeDefault position={[-300, 50, 230]} />
      ) : modelState === `${ACCESSORIES}` ? (
        <PerspectiveCamera makeDefault position={[0.2, 0.2, 0.3]} />
      ) : modelState === `${PHONES}` ? (
        <PerspectiveCamera makeDefault position={[0.7, 0.4, -1.4]} />
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
          {modelState === `${LAPTOPS}` ? (
            <AlienwareLaptop />
          ) : modelState === `${TABLETS}` ? (
            <CyberpunkTablet />
          ) : modelState === `${ACCESSORIES}` ? (
            <AppleVisionPro />
          ) : modelState === `${PHONES}` ? (
            <IPhone13 />
          ) : item ? (
            <IPhone
              scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
              item={item}
              size={size}
            />
          ) : null}
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
