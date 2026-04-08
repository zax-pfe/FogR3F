import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";

export default function Panel(props) {
  const panelRef = useRef();
  const { nodes, materials } = useGLTF("/assets/3DModels/panneau_marecage.glb");
  const setPanelPosition = useGameStore((state) => state.setPanelPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  useEffect(() => {
    setPanelPosition(panelRef.current.position);
  }, []);

  return (
    <group {...props} dispose={null} ref={panelRef} position={[3, 3.4, -3]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.007}>
          <mesh
            geometry={nodes.Panneau__0.geometry}
            material={materials["Scene_-_Root"]}
            position={[5.884, 100.155, 43.931]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            {elementContacted === "panel" && (
              <Outlines thickness={2} color="lightblue" />
            )}
          </mesh>
        </group>
      </group>
      <Sparkles size={1} count={100} speed={1} scale={[1, 3, 1]} />

      <PressButtonUI element="panel" />
    </group>
  );
}

useGLTF.preload("/assets/3DModels/panneau_marecage.glb");
