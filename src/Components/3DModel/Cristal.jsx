import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useGameStore } from "../../store/store.js";
import { useFrame } from "@react-three/fiber";
ss;

export default function Cristal(props) {
  const cristalRef = useRef();
  const { nodes, materials } = useGLTF("/assets/3DModels/cristal_textured.glb");
  const setCristalPosition = useGameStore((state) => state.setCristalPosition);

  useEffect(() => {
    setCristalPosition(cristalRef.current.position);
  }, []);

  useFrame((state, delta) => {
    if (cristalRef.current) {
      // console.log("Cristal position:", cristalRef.current.position);
      cristalRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group {...props} dispose={null} ref={cristalRef}>
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={materials.cristal}
      />
    </group>
  );
}

useGLTF.preload("/cristal_textured.glb");
