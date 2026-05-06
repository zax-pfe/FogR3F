import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Swing(props) {
  const swingRef = useRef();
  const isCompressed = useGameStore((state) => state.isCompressed);
  const setSwingPosition = useGameStore((state) => state.setSwingPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  const playerAnimation = useGameStore((state) => state.playerAnimation);

  const objName = isCompressed ? "Swing_compressed" : "Swing";
  const { nodes, materials } = useGLTF(`/assets/3DModels/Interactive/${objName}.glb`);

  useEffect(() => {
    setSwingPosition(swingRef.current.position);
  }, []);

  return (
    <group {...props} dispose={null} ref={swingRef} position={[23.61, 4.38, 28.5]}>
      <Sparkles
        size={1.5}
        depthWrite={true}
        color={"lightblue"}
        transparent
        count={25}
        speed={0.5}
        scale={[2, 2, 1]}
        position={[0, 0.5, 0]}
      />
      <group rotation={[-Math.PI, 1.22, -Math.PI + 0.07]} scale={0.7}>
        {playerAnimation !== "interaction" && <PressButtonUI element="swing" />}

        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.Line056_Material_0_0.geometry}
          material={materials.Material_0}
        >
          {elementContacted === "swing" && <Outlines thickness={2} color="lightblue" />}
        </mesh>
      </group>
    </group>
  );
}

// useGLTF.preload("/Swing.glb");
// useGLTF.preload("/Swing_compressed.glb");
