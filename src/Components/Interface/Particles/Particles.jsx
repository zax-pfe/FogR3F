import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import particlesVertexShader from "../../../shaders/particles/vertex.glsl?raw";
import particlesFragmentShader from "../../../shaders/particles/fragment.glsl?raw";

const SIZE = 6;
const COUNT = 260;
const NOISE = 0.03;

export default function Particles() {
  const pictureTexture = useLoader(
    THREE.TextureLoader,
    "/textures/tronk.png"
  );

  const uniforms = useMemo(() => {
    return {
      uPictureTexture: new THREE.Uniform(null),
      uMouse: new THREE.Uniform(new THREE.Vector2(9999, 9999)),
      uStrength: new THREE.Uniform(0),
      uTime: new THREE.Uniform(0),
    };
  }, []);

  uniforms.uPictureTexture.value = pictureTexture;

  const targetMouse = useRef(new THREE.Vector2(9999, 9999));
  const currentMouse = useRef(new THREE.Vector2(9999, 9999));
  const targetStrength = useRef(0);
  const currentStrength = useRef(0);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;

    currentStrength.current +=
      (targetStrength.current - currentStrength.current) * 0.02;
    currentMouse.current.lerp(targetMouse.current, 0.14);

    uniforms.uMouse.value.copy(currentMouse.current);
    uniforms.uStrength.value = currentStrength.current;
  });

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, COUNT, COUNT);

    geometry.setIndex(null);
    geometry.deleteAttribute("normal");

    const count = geometry.attributes.position.count;

    const intensitiesArray = new Float32Array(count);
    const anglesArray = new Float32Array(count);

    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      const randomX = (Math.random() - 0.5) * NOISE;
      const randomY = (Math.random() - 0.5) * NOISE;

      positionAttribute.setX(i, x + randomX);
      positionAttribute.setY(i, y + randomY);

      intensitiesArray[i] = Math.random();
      anglesArray[i] = Math.random() * Math.PI * 2;
    }

    positionAttribute.needsUpdate = true;

    geometry.setAttribute(
      "aIntensity",
      new THREE.BufferAttribute(intensitiesArray, 1)
    );

    geometry.setAttribute(
      "aAngle",
      new THREE.BufferAttribute(anglesArray, 1)
    );

    return geometry;
  }, []);

  return (
    <group>
      <points geometry={particlesGeometry}>
        <shaderMaterial
          vertexShader={particlesVertexShader}
          fragmentShader={particlesFragmentShader}
          uniforms={uniforms}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </points>

      <mesh
        onPointerMove={(event) => {
          targetMouse.current.set(event.uv.x, event.uv.y);
          targetStrength.current = 1;
        }}
        onPointerLeave={() => {
          targetStrength.current = 0;
        }}
      >
        <planeGeometry args={[SIZE, SIZE]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}