import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Peluche(props) {
  const pelucheRef = useRef();
  // const isCompressed = useGameStore((state) => state.isCompressed);
  // const setIsCompressed = useGameStore((state) => state.setIsCompressed);
  const objName = "Peluche_darker_compressed";
  const { nodes, materials } = useGLTF(`/assets/3DModels/Interactive/${objName}.glb`);

  const setPeluchePosition = useGameStore((state) => state.setPeluchePosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  const playerAnimation = useGameStore((state) => state.playerAnimation);

  useEffect(() => {
    setPeluchePosition(pelucheRef.current.position);
  }, []);

  return (
    <group {...props} dispose={null} ref={pelucheRef} scale={0.25} position={[6.88, 3.47, -1.31]}>
      <Sparkles
        size={1.5}
        depthWrite={true}
        color={"lightblue"}
        transparent
        count={15}
        speed={0.5}
        scale={[1, 1, 1]}
        position={[-0.1, 1, 1]}
      />
      <group rotation={[-1.63, 0, -3.02]}>
        {playerAnimation !== "interaction" && <PressButtonUI element="peluche" />}

        <mesh geometry={nodes.tete001.geometry} material={materials.peluche_material_darker}>
          {elementContacted === "peluche" && <Outlines thickness={2} color="lightblue" />}
        </mesh>
      </group>
    </group>
  );
}
