import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";

export default function AmmoBox(props) {
  const ammoBoxRef = useRef();
  const { nodes, materials } = useGLTF(
    "/assets/3DModels/Interactive/military_supply_box.glb",
  );

  const setAmmoBoxPosition = useGameStore((state) => state.setAmmoBoxPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);

  useEffect(() => {
    setAmmoBoxPosition(ammoBoxRef.current.position);
  }, []);

  return (
    <group {...props} dispose={null} ref={ammoBoxRef} scale={[0.01]}>
      <mesh
        geometry={nodes.Cube009__0.geometry}
        material={materials["Scene_-_Root"]}
        position={[60, 56, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        geometry={nodes.Cube004__0.geometry}
        material={materials["Scene_-_Root"]}
        position={[-83, 28, -63.4]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      {elementContacted === "ammoBox" && (
        <Outlines thickness={2} color="lightblue" />
      )}
    </group>
  );
}

useGLTF.preload("/assets/3DModels/Interactive/military_supply_box.glb");
