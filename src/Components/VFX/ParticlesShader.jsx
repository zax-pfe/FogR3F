import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { useControls } from "leva";

export default function Particles() {
  const texture = useLoader(THREE.TextureLoader, "./textures/circle_05.png");
  const {
    scale,
    size_x,
    size_y,
    size_z,
    speed,
    position_x,
    position_y,
    position_z,
    color,
  } = useControls(
    "Particles",
    {
      scale: { value: 0.12, min: 0.01, max: 2, step: 0.01 },
      size_x: { value: 60, min: 2, max: 100, step: 1 },
      size_y: { value: 8, min: 2, max: 100, step: 1 },
      size_z: { value: 57, min: 2, max: 100, step: 1 },
      speed: { value: 0.005, min: 0.001, max: 0.01, step: 0.001 },
      position_x: { value: 11.3, min: -50, max: 50, step: 0.1 },
      position_y: { value: 2.7, min: -50, max: 50, step: 0.1 },
      position_z: { value: 5.4, min: -50, max: 50, step: 0.1 },
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
      arr[i * 3 + 0] = (Math.random() - 0.5) * size_x;
      arr[i * 3 + 1] = (Math.random() - 0.5) * size_y;
      arr[i * 3 + 2] = (Math.random() - 0.5) * size_z;
    }

    return arr;
  }, [count, size_x, size_y, size_z]);

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
    <group position={[position_x, position_y, position_z]}>
      {/* <mesh>
        <boxGeometry args={[size_x, size_y, size_z]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh> */}
      <points ref={pointsRef}>
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
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </points>
    </group>
  );
}
