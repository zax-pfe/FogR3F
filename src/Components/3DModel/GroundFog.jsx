import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import groundFogVertexShader from '../../shaders/groundfog/vertex.glsl?raw';
import groundFogFragmentShader from '../../shaders/groundfog/fragment.glsl?raw';

const GroundFog = ({ position, opacity, scale, rotation = 0, color = "#6b6b6b" }) => {
    const materialRef = useRef();

    useFrame((state) => {
  if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uCameraPosition.value.copy(state.camera.position);
    });

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, rotation]} scale={scale || 1}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        transparent 
        depthWrite={false}
        uniforms={{
          uColor: { value: new THREE.Color(color) },
          uTime: { value: 0 },
          uCameraPosition: { value: new THREE.Vector3() },
          uOpacity: { value: opacity || 1 },
          uPosition: { value: new THREE.Vector3(...position) },
          uScale: { value: scale || 1 },
        }}
        vertexShader={groundFogVertexShader}
        fragmentShader={groundFogFragmentShader}
      />
    </mesh>
  );
};

export default GroundFog;
