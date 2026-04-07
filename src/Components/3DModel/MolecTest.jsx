import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail, Outlines } from "@react-three/drei";
import * as THREE from "three";

import { extend } from "@react-three/fiber";
import { MeshLineMaterial } from "meshline";

extend({ MeshLineMaterial });

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
        opacity={0.08}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        lineWidth={1}
      />
      <mesh scale={0.2} ref={meshRef}>
        <sphereGeometry />
        <meshStandardMaterial color={"red"} />
        <Outlines thickness={1} color="hotpink" />
      </mesh>
    </Trail>
  );
}
