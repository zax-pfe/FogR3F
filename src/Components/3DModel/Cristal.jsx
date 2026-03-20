import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useGameStore } from "../../store/store.js";

export default function Cristal(props) {
  const cristalRef = useRef();
  const { nodes, materials } = useGLTF("/assets/3DModels/cristal_textured.glb");
  const setCristalPosition = useGameStore((state) => state.setCristalPosition);

  useEffect(() => {
    setCristalPosition(cristalRef.current.position);
  }, []);

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
