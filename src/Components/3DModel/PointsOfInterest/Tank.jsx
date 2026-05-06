import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

export default function Tank(props) {
  const tankRef = useRef();

  const { isCompressed, setIsCompressed } = useGameStore();
  const objName = isCompressed ? "tank_compressed" : "tank";

  const { nodes, materials } = useGLTF(`/assets/3DModels/Interactive/${objName}.glb`);

  const setTankPosition = useGameStore((state) => state.setTankPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  const playerAnimation = useGameStore((state) => state.playerAnimation);

  useEffect(() => {
    const offset = new THREE.Vector3(2, -1, 1);
    const adjustedPosition = tankRef.current.position.clone().add(offset);
    setTankPosition(adjustedPosition);
  }, []);

  return (
    // <PivotControls
    //   anchor={[0, 0, 0]}
    //   depthTest={false}
    //   onDrag={(localMatrix) => {
    //     const position = new THREE.Vector3();
    //     position.setFromMatrixPosition(localMatrix);
    //     console.log("real position:", position);
    //     const rotation = new THREE.Euler();
    //     rotation.setFromRotationMatrix(localMatrix);
    //     console.log("real rotation:", rotation);
    //   }}
    // >
    <group {...props} dispose={null} scale={0.7} position={[28.15, 5, -0.4]} ref={tankRef}>
      <RigidBody
        type="fixed"
        colliders={false}
        position={[0, 0, -1]}
        rotation={[0, -Math.PI / 7, 0]}
      >
        <CuboidCollider args={[2, 3, 4]} />
      </RigidBody>

      <Sparkles
        size={1.5}
        depthWrite={true}
        color={"lightblue"}
        transparent
        count={100}
        speed={1}
        scale={[6, 7, 7]}
        position={[-0.1, -0.3, 1]}
        toneMapped={false}
        noise={1}
      />
      {playerAnimation !== "interaction" && <PressButtonUI element="tank" />}

      <group rotation={[0.15, -0.42, -0.15]}>
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.tank_material}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {elementContacted === "tank" && <Outlines thickness={2} color="lightblue" />}
        </mesh>
      </group>
    </group>
    // </PivotControls>
  );
}

useGLTF.preload("/tank.glb");
