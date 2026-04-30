import React, { useRef, useEffect, useState } from "react";
import { useGLTF, Outlines, Html, Sparkles } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PressButtonUI from "./PressButtonUI.jsx";

export default function Cristal(props) {
  const cristalRef = useRef();
  const { nodes, materials } = useGLTF(
    "/assets/3DModels/Interactive/cristal_textured.glb",
  );
  const setCristalPosition = useGameStore((state) => state.setCristalPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);

  // const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setCristalPosition(cristalRef.current.position);
  }, []);

  useEffect(() => {
    // Keep the crystal visible when camera gets close/inside after scaling.
    if (materials?.cristal) {
      materials.cristal.side = THREE.DoubleSide;
      materials.cristal.needsUpdate = true;
    }
  }, [materials]);

  useFrame((state, delta) => {
    if (cristalRef.current) {
      // console.log("Cristal position:", cristalRef.current.position);
      cristalRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      ref={cristalRef}
      scale={0.1}
      position={[2, 5, 2]}
    >
      <Sparkles size={1} count={50} speed={1} scale={[0.6, 0.6, 0.6]} />
      <mesh
        geometry={nodes.Icosphere.geometry}
        frustumCulled={false}
      >
        <meshStandardMaterial
          map={materials.cristal.map}
          emissive={new THREE.Color(1, 2, 10)}
          emissiveIntensity={10}
          toneMapped={false}
        />
        {elementContacted === "cristal" && (
          <Outlines thickness={2} color="lightblue" />
        )}
      </mesh>

      <PressButtonUI element="cristal" />
    </group>
  );
}

useGLTF.preload("/assets/3DModels/Interactive/cristal_textured.glb");
