import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { useControls } from "leva";

export default function Particles() {
  const texture = useLoader(THREE.TextureLoader, "./textures/circle_05.png");
  const { scale, size, speed, color } = useControls(
    "Particles",
    {
      scale: { value: 0.2, min: 0.01, max: 2, step: 0.01 },
      size: { value: 50, min: 20, max: 100, step: 1 },
      speed: { value: 0.005, min: 0.001, max: 0.01, step: 0.001 },
      color: "#501e1e",
    },
    { collapsed: true },
  );
  const noise3D = createNoise3D();
  const pointsRef = useRef();

  const count = 5000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] = (Math.random() - 0.5) * size;
      arr[i * 3 + 2] = (Math.random() - 0.5) * size;
      arr[i * 3 + 0] = (Math.random() - 0.5) * size;
    }

    return arr;
  }, [count, size]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      const noise = noise3D(x * 0.2, y * 0.2, time * 0.2);
      positions[i3 + 1] += noise * speed;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={scale}
        map={texture}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </points>
  );
}
