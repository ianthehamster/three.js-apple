import { Html } from '@react-three/drei';
import React from 'react';

import { hourglass } from 'ldrs';

hourglass.register();

const Loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">
          <l-hourglass
            size="40"
            bg-opacity="0.1"
            speed="1.75"
            color="black"
          ></l-hourglass>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
