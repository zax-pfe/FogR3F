import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Pointer(props) {
  const pointerRef = useRef();
  const { nodes, materials } = useGLTF(
    "/assets/3DModels/Interactive/Pointer.glb",
  );

  const setPointerPosition = useGameStore((state) => state.setPointerPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);

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
    <group
      {...props}
      dispose={null}
      ref={pointerRef}
      position={[-3.71, 3.7, 22.68]}
    >
      <group position={[0, 0.006, -0.005]} scale={1.011}>
        <mesh
          geometry={nodes["+Pointer_1"].geometry}
          material={materials["+Wood_dark"]}
        >
          {elementContacted === "pointer" && (
            <Outlines thickness={2} color="lightblue" />
          )}
        </mesh>
        <mesh
          geometry={nodes["+Pointer_2"].geometry}
          material={nodes["+Pointer_2"].material}
        />
      </group>
      <Sparkles size={1} count={100} speed={1} scale={[1, 3, 1]} />

      <PressButtonUI element="pointer" />
    </group>
    // </PivotControls>
  );
}

useGLTF.preload("/assets/3DModels/Interactive/Pointer.glb");
