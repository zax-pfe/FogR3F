import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Tronk(props) {
  const tronkRef = useRef();

  const { nodes, materials } = useGLTF(
    "/assets/3DModels/Interactive/tronk_new.glb",
  );

  const setTronkPosition = useGameStore((state) => state.setTronkPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);

  useEffect(() => {
    setTronkPosition(tronkRef.current.position);
  }, []);
  return (
    // <PivotControls
    //   anchor={[0, 0, 0]}
    //   depthTest={false}
    //   onDrag={(localMatrix) => {
    //     const position = new THREE.Vector3();
    //     position.setFromMatrixPosition(localMatrix);
    //     console.log("real position:", position);
    //   }}
    // >
    <group
      {...props}
      dispose={null}
      position={[28.892, 3.715, -10.492]} 
      scale={1.2}
      ref={tronkRef}
    >
      <mesh
        // castShadow
        // receiveShadow
         geometry={nodes['+tronk'].geometry}
        material={materials['+Tronk']} 
      >
        {elementContacted === "tronk" && (
          <Outlines thickness={2} color="lightblue" />
        )}
      </mesh>
      <Sparkles size={1} count={50} speed={1} scale={[1, 1, 1]} />

      <PressButtonUI element="tronk" />
    </group>
    // </PivotControls>
  );
}

useGLTF.preload("/assets/3DModels/Interactive/tronk_new.glb");
