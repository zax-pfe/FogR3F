import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BrokenRobot(props) {
  const brokenRobotRef = useRef();

  const { isCompressed, setIsCompressed } = useGameStore();
  const objName = isCompressed ? "brokenBot_compressed" : "brokenBot";

  const { nodes, materials } = useGLTF(`/assets/3DModels/Interactive/${objName}.glb`);

  const setBrokenRobotPosition = useGameStore((state) => state.setBrokenRobotPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  const playerAnimation = useGameStore((state) => state.playerAnimation);

  useEffect(() => {
    setBrokenRobotPosition(brokenRobotRef.current.position);
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
      position={[-9.76, 3.98, 6.25]}
      rotation={[-1.56, 0, 2.63]}
      ref={brokenRobotRef}
      scale={0.8}
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

      {playerAnimation !== "interaction" && <PressButtonUI element="brokenRobot" />}

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.MAT_STAFFBot_Shattered}
        rotation={[Math.PI / 2, 0, 0]}
      >
        {elementContacted === "brokenRobot" && <Outlines thickness={2} color="lightblue" />}
      </mesh>
    </group>
    // </PivotControls>
  );
}

// useGLTF.preload("/assets/3DModels/Interactive/brokenBot.glb");
