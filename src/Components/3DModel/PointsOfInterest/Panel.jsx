import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";

export default function Panel(props) {
  const panelRef = useRef();
  const { nodes, materials } = useGLTF("/assets/3DModels/panneau_marecage.glb");
  const setPanelPosition = useGameStore((state) => state.setPanelPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  useEffect(() => {
    setPanelPosition(panelRef.current.position);
  }, []);

  return (
    <group {...props} dispose={null} ref={panelRef}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Panneau__0.geometry}
            material={materials["Scene_-_Root"]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            {elementContacted === "panel" && (
              <Outlines thickness={2} color="lightblue" />
            )}
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/panneau_marecage.glb");
