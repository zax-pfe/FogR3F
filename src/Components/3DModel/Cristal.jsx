import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Cristal(props) {
  const { nodes, materials } = useGLTF("/assets/3DModels/cristal_textured.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={materials.cristal}
      />
    </group>
  );
}

useGLTF.preload("/cristal_textured.glb");
