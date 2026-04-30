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
    "/assets/3DModels/Interactive/posters/posterRouge.glb",
  );

  const setPosterPosition = useGameStore((state) => state.setPosterPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);

  useEffect(() => {
    setPosterPosition(posterRef.current.position);
  }, []);

  return (
    // <PivotControls
    //   anchor={[0, 0, 0]}
    //   depthTest={false}
    //   onDrag={(localMatrix) => {
    //     const position = new THREE.Vector3();
    //     position.setFromMatrixPosition(localMatrix);
    //     console.log("real position:", position);
    //     const rotation = new THREE.Euler();
    //     rotation.setFromRotationMatrix(localMatrix);
    //     console.log("real rotation:", rotation);
    //   }}
    // >
    //   <group
    //     {...props}
    //     dispose={null}
    //     position={[17.37, 3.65, 18.97]}
    //     scale={0.7}
    //   >
    //     <group rotation={[-Math.PI / 2, 0, Math.PI]}>
    //       <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
    //         <mesh
    //           castShadow
    //           receiveShadow
    //           geometry={nodes.Poster_Poster_0.geometry}
    //           material={materials.Poster}
    //           position={[0, 96.131, 1.706]}
    //         />
    //       </group>
    //     </group>
    //   </group>

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

useGLTF.preload("/assets/3DModels/Interactive/posters/posterBlanc.glb");
