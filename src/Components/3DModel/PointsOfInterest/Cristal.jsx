import React, { useRef, useEffect, useState } from "react";
import { useGLTF, Outlines, Html } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PressButtonUI from "./PressButtonUI.jsx";

export default function Cristal(props) {
  const cristalRef = useRef();
  const { nodes, materials } = useGLTF("/assets/3DModels/cristal_textured.glb");
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
      <mesh
        geometry={nodes.Icosphere.geometry}
        material={materials.cristal}
        frustumCulled={false}
      >
        {elementContacted === "cristal" && (
          <Outlines thickness={2} color="lightblue" />
        )}
      </mesh>
      {/* <Html>
        <div
          style={{
            color: "White",
            backgroundColor: "rgba(0, 0, 0)",
            height: "20px",
            width: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            fontSize: "16px",
            transition: "all 0.5s",
            opacity: elementContacted !== "cristal" ? 0 : 0.5,
            transform: `scale(${elementContacted !== "cristal" ? 0.5 : 1})`,
          }}
        >
          E
        </div>
      </Html> */}
      <PressButtonUI element="cristal" />
    </group>
  );
}

useGLTF.preload("/assets/3DModels/cristal_textured.glb");
