import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import groundFogVertexShader from "../../shaders/groundfog/vertex.glsl?raw";
import groundFogFragmentShader from "../../shaders/groundfog/fragment.glsl?raw";

export default function GroundFog() {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#8a8a8a") },
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() },
      uOpacity: { value: 0.08 },
      uPosition: { value: new THREE.Vector3(0, 3.7, 0) },
      uScale: { value: 2 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uCameraPosition.value.copy(state.camera.position);
  });

  return (
    <mesh
      position={[0, 3.7, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={2}
      frustumCulled={false}
    >
      <planeGeometry args={[100, 100]} />

      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={true}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={groundFogVertexShader}
        fragmentShader={groundFogFragmentShader}
      />
    </mesh>
  );
}