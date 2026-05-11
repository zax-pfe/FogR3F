import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import groundFogVertexShader from "../../shaders/groundfog/vertex.glsl?raw";
import groundFogFragmentShader from "../../shaders/groundfog/fragment.glsl?raw";
import { time } from "motion";

export default function GroundFog({
  position = [0, 3.7, 0],
  scale = 2,
  opacity = 0.08,
  color = "#8a8a8a",
  vertexStrength = 3.0,
  vertexScale = 1.0,
  timeRatio = 1.0,
}) {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      // fragment shader uniforms
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() },
      uOpacity: { value: opacity },
      uPosition: { value: new THREE.Vector3(...position) },
      uScale: { value: scale },

      // vertex shader uniforms
      uVertexStrength: { value: vertexStrength },
      uVertexScale: { value: vertexScale },
      uTimeRatio: { value: timeRatio },
    }),
    [color, opacity, position, scale, vertexStrength, vertexScale, timeRatio],
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uCameraPosition.value.copy(state.camera.position);
  });

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale} frustumCulled={false}>
      <planeGeometry args={[100, 100, 256, 256]} />

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
