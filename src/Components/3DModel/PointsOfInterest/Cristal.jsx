import React, { useRef, useEffect } from "react";
import { useGLTF, Outlines } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { useFrame } from "@react-three/fiber";

export default function Cristal(props) {
  const cristalRef = useRef();
  const { nodes, materials } = useGLTF("/assets/3DModels/cristal_textured.glb");
  const setCristalPosition = useGameStore((state) => state.setCristalPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);

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
      <mesh geometry={nodes.Icosphere.geometry} material={materials.cristal}>
        {elementContacted === "cristal" && (
          <Outlines thickness={2} color="lightblue" />
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload("/cristal_textured.glb");
