import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Pointer(props) {
  const pointerRef = useRef();

  const { isCompressed, setIsCompressed } = useGameStore();
  const objName = isCompressed ? "Pointer_compressed" : "Pointer";

  const { nodes, materials } = useGLTF(`/assets/3DModels/Interactive/${objName}.glb`);

  const setPointerPosition = useGameStore((state) => state.setPointerPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  const playerAnimation = useGameStore((state) => state.playerAnimation);

  useEffect(() => {
    setPointerPosition(pointerRef.current.position);
  }, []);

  return (
    // <PivotControls
    //   anchor={[0, 0, 0]}
    //   depthTest={false}
    //   onDrag={(localMatrix) => {
    //     const position = new THREE.Vector3();
    //     position.setFromMatrixPosition(localMatrix);
    //     console.log("real position:", position);
    //     console.log("scale:", pointerRef.current.scale);
    //   }}
    // >
    <group {...props} dispose={null} ref={pointerRef} position={[-3.71, 3.7, 22.68]}>
      <group position={[0, 0.006, -0.005]} scale={1.011}>
         <mesh
        castShadow
        receiveShadow
        geometry={nodes['+Pointer'].geometry}
        material={materials['+Wood_dark']}
      >
          {elementContacted === "pointer" && <Outlines thickness={2} color="lightblue" />}
        </mesh>
       
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={nodes.Text.material}
        position={[-0.559, 0.202, 0.134]}
        rotation={[0.306, -0.524, -0.046]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text001.geometry}
        material={nodes.Text001.material}
        position={[0.043, 0.743, 0.366]}
        rotation={[1.573, 0.024, 0.799]}
        scale={[0.057, 0.075, 0.048]}
      />
      </group>

      <Sparkles
        size={1.5}
        depthWrite={true}
        color={"lightblue"}
        transparent
        count={18}
        speed={0.5}
        scale={[1, 2, 1]}
        position={[0, 0.4, 0]}
      />

      {playerAnimation !== "interaction" && <PressButtonUI element="pointer" />}
    </group>
    // </PivotControls>
  );
}

// useGLTF.preload("/assets/3DModels/Interactive/Pointer.glb");
