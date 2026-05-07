import React from "react";
import { useGameStore } from "../../../../store/store.js";
import * as THREE from "three";
import { useRef } from "react";
import { OrbitControls, useGLTF, Float, Image, Environment } from "@react-three/drei";

import { useFrame, Canvas } from "@react-three/fiber";
import vertexShader from "../../../../shaders/transitionScreen/vertex.glsl?raw";
import fragmenShader from "../../../../shaders/transitionScreen/fragment.glsl?raw";
import { useControls } from "leva";
import s from "./ScreenTransition.module.scss";

export default function ScreenTransitionElement() {
  const materialRef = useRef();

  const { revealProgress } = useControls({
    revealProgress: { value: 1.12, min: -1, max: 3 },
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uProgress.value = revealProgress;
    }
  });

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[10, 6, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          transparent={true}
          vertexShader={vertexShader}
          fragmentShader={fragmenShader}
          uniforms={{
            uTime: { value: 0 },
            uProgress: { value: 0 },
          }}
        />
      </mesh>
    </>
  );
}
