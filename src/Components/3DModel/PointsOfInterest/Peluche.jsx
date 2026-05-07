import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Peluche(props) {
  const pelucheRef = useRef();
  // const isCompressed = useGameStore((state) => state.isCompressed);
  // const setIsCompressed = useGameStore((state) => state.setIsCompressed);
  const objName = "Peluche_compressed";
  const { nodes, materials } = useGLTF(`/assets/3DModels/Interactive/${objName}.glb`);

  const setPeluchePosition = useGameStore((state) => state.setPeluchePosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  const playerAnimation = useGameStore((state) => state.playerAnimation);

  useEffect(() => {
    setPeluchePosition(pelucheRef.current.position);
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
    <group
      {...props}
      dispose={null}
      ref={pelucheRef}
      scale={0.25}
      position={[6.88, 3.3 + 0.17, -1.28 + 0.3]}
      rotation={[-1.63, 0, -3.02]}
    >
      <Sparkles
        size={1.5}
        depthWrite={true}
        color={"lightblue"}
        transparent
        count={15}
        speed={0.5}
        scale={[1, 1, 1]}
        position={[-0.1, -0.3, 1]}
      />
      {playerAnimation !== "interaction" && <PressButtonUI element="peluche" />}

      <mesh geometry={nodes.Cube002.geometry} material={materials.peluche_material}>
        {elementContacted === "peluche" && <Outlines thickness={2} color="lightblue" />}
      </mesh>
      <mesh geometry={nodes.Cube002_1.geometry} material={materials.oreille} />
      <mesh geometry={nodes.Cube002_2.geometry} material={materials.bouche} />
      <mesh geometry={nodes.Cube002_3.geometry} material={materials["peau.002"]} />
      <mesh geometry={nodes.Cube002_4.geometry} material={materials.blanc} />
      <mesh geometry={nodes.Cube002_5.geometry} material={materials.noir} />
    </group>
    // </PivotControls>
  );
}
