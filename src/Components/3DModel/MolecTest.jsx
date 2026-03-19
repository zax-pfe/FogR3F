import React from "react";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center, PivotControls, Float } from "@react-three/drei";
import * as THREE from "three";

export default function MolecTest({ targetRef }) {
  const meshRef = useRef();
  const targetWorld = useRef(new THREE.Vector3());
  const desired = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!meshRef.current || !targetRef?.current) return;

    // Position monde du personnage
    targetRef.current.getWorldPosition(targetWorld.current);

    desired.current
      .copy(targetWorld.current)
      .add(new THREE.Vector3(-1.5, 3, 0));

    const followSpeed = 0.5; // plus petit = plus lent
    const t = 1 - Math.exp(-followSpeed * delta);

    meshRef.current.position.lerp(desired.current, t);
  });
  return (
    <Float
      speed={4}
      rotationIntensity={0}
      floatIntensity={1}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh scale={0.2} ref={meshRef}>
        <sphereGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </Float>
  );
}
