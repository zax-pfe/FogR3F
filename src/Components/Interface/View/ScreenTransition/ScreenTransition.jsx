import React from "react";
import { useGameStore } from "../../../store/store.js";
import { Canvas } from "@react-three/fiber";

import vertexShader from "../../../../shaders/transitionScreen/vertex.glsl?raw";
import fragmenShader from "../../../../shaders/transitionScreen/fragment.glsl?raw";

export default function ScreenTransition() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.sRGBEncoding,
      }}
      // orthographic
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 2, 10],
      }}
    >
      <Experience />
    </Canvas>
  );
}
