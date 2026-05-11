// ______________________ REACT & FIBER & DREI & UTILS __________________/
import { useFrame, useThree, extend, Canvas, useLoader } from "@react-three/fiber";
import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useControls } from "leva";

// ______________________ UI & EFFECTS __________________/
import vertexShaderFog from "../../shaders/fogStartScreen/vertex.glsl?raw";
import fragmentShaderFog from "../../shaders/fogStartScreen/fragment.glsl?raw";

export default function VolumetricFog({
  rotation,
  position,
  scale,
  boxSize,
  timeRatio,
  alphaRatio,
  scaleRatio,
  alphaYRatio,
  noiseStrength,
  color,
}) {
  const materialRef = useRef();

  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh rotation={rotation} position={position} scale={scale}>
      <boxGeometry args={boxSize} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uMeshPosition: { value: new THREE.Vector3(0, -7.5, 1.5) },
          uGlowRadius: { value: 7.0 },
          uGlowIntensity: { value: 0.3 },
          uTimeRatio: { value: timeRatio },
          uAlphaRatio: { value: alphaRatio },
          uScaleRatio: { value: scaleRatio },
          uAlphaYRatio: { value: alphaYRatio },
          uNoiseStrength: { value: noiseStrength },
          uBaseColor: { value: new THREE.Color(color) },
        }}
        vertexShader={vertexShaderFog}
        fragmentShader={fragmentShaderFog}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
