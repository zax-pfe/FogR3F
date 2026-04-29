import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail, Outlines } from "@react-three/drei";
import * as THREE from "three";

import { extend } from "@react-three/fiber";
import { MeshLineMaterial } from "meshline";
import { useGameStore } from "../../store/store";

extend({ MeshLineMaterial });

export default function MolecTest({ targetRef }) {
  const meshRef = useRef();
  const targetWorld = useRef(new THREE.Vector3());
  const desired = useRef(new THREE.Vector3());
  const playerPosition = useGameStore((state) => state.playerPosition);
  const [initialized, setInitialized] = useState(false);

  useFrame((state, delta) => {
    // if (!meshRef.current || !targetRef?.current) {
    if (!meshRef.current || !playerPosition) {
      // console.warn("Mesh  not found");
      return;
    }
    desired.current.copy(playerPosition).add(new THREE.Vector3(-0.6, 0.2, 0));
    if (!initialized) {
      meshRef.current.position.copy(desired.current);
      setInitialized(true);
    }
    // Position monde du personnage
    // targetRef.current.getWorldPosition(targetWorld.current);

    const followSpeed = 0.5; // plus petit = plus lent
    const t = 1 - Math.exp(-followSpeed * delta);

    meshRef.current.position.lerp(desired.current, t);
  });

  return (
    <Trail
      width={10}
      color={"lightblue"}
      length={3}
      decay={0.1}
      local={true}
      stride={0}
      interval={1}
      attenuation={(t) => t}
    >
      <meshLineMaterial
        color="#aee6ff"
        transparent
        opacity={0.2}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        lineWidth={0.35}
      />
      <mesh scale={0.07} ref={meshRef}>
        <sphereGeometry />
        <meshStandardMaterial color={"red"} />
        <Outlines thickness={1} color="red" />
      </mesh>
    </Trail>
  );
}
