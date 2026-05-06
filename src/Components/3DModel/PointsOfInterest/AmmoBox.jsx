import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AmmoBox(props) {
  const ammoBoxRef = useRef();

  const { isCompressed, setIsCompressed } = useGameStore( );
  const objName = isCompressed ? "ammo_box_compressed" : "ammo_box";
  
  const { nodes, materials } = useGLTF(
    `/assets/3DModels/Interactive/${objName}.glb`,
  );

  const setAmmoBoxPosition = useGameStore((state) => state.setAmmoBoxPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);

  useEffect(() => {
    setAmmoBoxPosition(ammoBoxRef.current.position);
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
      position={[-4.89, 3.53, -9.83]}
      ref={ammoBoxRef}
    >
      
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials["Material.001"]}
        rotation={[-Math.PI / 2, 0, Math.PI  ]}
      >
        {elementContacted === "ammoBox" && (
          <Outlines thickness={2} color="lightblue" />
        )}
      </mesh>
      <Sparkles size={1} count={50} speed={1} scale={[1, 1, 1]} />

      <PressButtonUI element="ammoBox" />
    </group>
    // </PivotControls>
  );
}

// useGLTF.preload("/assets/3DModels/Interactive/ammo_box.glb");
