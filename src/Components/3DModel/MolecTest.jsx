import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail, useHelper } from "@react-three/drei";
import * as THREE from "three";

import { extend } from "@react-three/fiber";
import { MeshLineMaterial } from "meshline";
import { useGameStore } from "../../store/store";

import { MolecBody } from "./MolecBody.jsx";

extend({ MeshLineMaterial });

export default function MolecTest({ targetRef }) {
  const meshRef = useRef();
  const lightRef = useRef();
  const desired = useRef(new THREE.Vector3());
  const playerPosition = useGameStore((state) => state.playerPosition);
  const [initialized, setInitialized] = useState(false);

  // useHelper(lightRef, THREE.PointLightHelper, 0.4, "#38ff15");
  const target = new THREE.Vector3();

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

    const followSpeed = 0.8; // plus petit = plus lent
    const t = 1 - Math.exp(-followSpeed * delta);

    meshRef.current.position.lerp(desired.current, t);
    // meshRef.current.lookAt(new THREE.Vector3(...playerPosition));
    target.copy(playerPosition);

    if (meshRef.current.position.distanceTo(target) > 0.001) {
      meshRef.current.lookAt(target);
      meshRef.current.rotateY(-Math.PI / 2); // ou autre valeur
    }
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
        color="#ecf9ff"
        transparent
        opacity={0.2}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        lineWidth={0.35}
      />

      <MolecBody ref={meshRef} scale={0.15}>
        <pointLight
          color="#b94fe3"
          intensity={10}
          distance={0.13}
          position={[0, 0, 0]}
        />

        <pointLight
          ref={lightRef}
          color="#ebebf3"
          intensity={100}
          distance={100}
          position={[-4, 7, -12]}
        />
      </MolecBody>
    </Trail>
  );
}
