import { useRef, useMemo } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { useControls } from "leva";
import { FileLoader } from "three";

// import particlesFragmentShader from "../../shaders/particles/fragment.glsl";

export default function ParticlesShader() {
  const vertexShader = useLoader(
    FileLoader,
    "../../shaders/particles/vertex.glsl",
  );

  const fragmentShader = useLoader(
    FileLoader,
    "../../shaders/particles_texture/fragment.glsl",
    // "../../shaders/particles/fragment.glsl",
  );

  const { gl } = useThree(); // ← c’est ton renderer

  // console.log("vertexShader:", vertexShader);
  // console.log("fragmentShader:", fragmentShader);

  const texture = useLoader(THREE.TextureLoader, "./textures/circle_05.png");
  const { size_x, size_y, size_z, position_x, position_y, position_z, color } =
    useControls(
      "Particles",
      {
        size_x: { value: 60, min: 2, max: 100, step: 1 },
        size_y: { value: 8, min: 2, max: 100, step: 1 },
        size_z: { value: 57, min: 2, max: 100, step: 1 },
        position_x: { value: 11.3, min: -50, max: 50, step: 0.1 },
        position_y: { value: 2.7, min: -50, max: 50, step: 0.1 },
        position_z: { value: 5.4, min: -50, max: 50, step: 0.1 },
        color: "#b9a3a3",
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

  const scales = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random();
    }
    return arr;
  }, [count]);

  const movement_speed = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 3;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = time;
    }
  });

  return (
    <group position={[position_x, position_y, position_z]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aScale"
            count={scales.length}
            array={scales}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aSpeed"
            count={movement_speed.length}
            array={movement_speed}
            itemSize={1}
          />
        </bufferGeometry>

        <shaderMaterial
          // map={texture}
          // color={color}
          // transparent
          // opacity={0.4}
          // side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            // uScale: { value: scale },
            // uScale: { value: 3 * gl.getPixelRatio() },
            uScale: { value: 30 },
            uTexture: { value: texture },
            uColor: { value: new THREE.Color(color) },
            uOpacity: { value: 0.8 },

            uTime: { value: 0 },
            // uTexture: { value: texture },
            // uColor: { value: new THREE.Color(color) },
          }}
        />
      </points>
    </group>
  );
}
