import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import groundFogVertexShader from "../../shaders/groundfog/vertex.glsl?raw";
import groundFogFragmentShader from "../../shaders/groundfog/fragment.glsl?raw";

export default function GroundFog({ position = [0, 3.7, 0], scale = 2, opacity = 0.08, color = "#8a8a8a"}) {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() },
      uOpacity: { value: opacity },
      uPosition: { value: new THREE.Vector3(...position) },
      uScale: { value: scale },
    }),
    [color, opacity, position, scale]
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uCameraPosition.value.copy(state.camera.position);
  });

  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={scale}
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