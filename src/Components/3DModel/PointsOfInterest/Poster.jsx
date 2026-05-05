import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Poster(props) {
  const posterRef = useRef();

  const { nodes, materials } = useGLTF(
    "/assets/3DModels/Interactive/posters/posterBlanc.glb",
  );

  const setPosterPosition = useGameStore((state) => state.setPosterPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);

  useEffect(() => {
    setPosterPosition(posterRef.current.position);
  }, []);

  return (
    <group
      {...props}
      dispose={null}
      position={[17.34, 4.06, 18.99]}
      ref={posterRef}
    >
      <Sparkles size={1} count={100} speed={1} scale={[1, 1, 1]} />
      <group scale={[0.15, 0.15, 0.15]} rotation={[-1.03, -1.5, 0.53]}>
        <PressButtonUI element="poster" />

        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.planeBlanc.geometry}
          material={materials.posterMaterial2}
          scale={[-1.986, 1, -1.489]}
        ></mesh>

        <mesh rotation={[-1.63, 0, 0]}>
          <boxGeometry args={[4, 3, 0.1]} />

          <meshBasicMaterial opacity={0} transparent={true} />

          {elementContacted === "poster" && (
            <Outlines thickness={2} color="lightblue" />
          )}
        </mesh>
      </group>
    </group>
  );
}

// useGLTF.preload("/assets/3DModels/Interactive/posters/posterBlanc.glb");
