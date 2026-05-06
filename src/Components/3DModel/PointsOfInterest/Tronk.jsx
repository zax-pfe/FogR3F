import React, { useRef, useEffect, useState, use } from "react";
import { useGLTF, Html, Sparkles, PivotControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { Outlines } from "@react-three/drei";
import PressButtonUI from "./PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { c_AudioUI } from "../../../constant/audio.js";

export default function Tronk(props) {
  const tronkRef = useRef();

  const isCompressed = useGameStore((state) => state.isCompressed);
  const setIsCompressed = useGameStore((state) => state.setIsCompressed);
  const setSmthgIsHovered = useGameStore((state) => state.setSmthgIsHovered);

  const objName = isCompressed ? "tronk_new_compressed" : "tronk_new";

  const { nodes, materials } = useGLTF(`/assets/3DModels/Interactive/${objName}.glb`);

  const toolNeeded = "Loupe";
  const [outlineColor, setOutlineColor] = useState("lightblue");

  const setTronkPosition = useGameStore((state) => state.setTronkPosition);
  const elementContacted = useGameStore((state) => state.elementContacted);
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);
  const currentTool = useGameStore((state) => state.currentTool);
  const toolOpen = useGameStore((state) => state.toolOpen);
  const setCurrentDialogue = useGameStore((state) => state.setCurrentDialogue);

  const handleClick = () => {
    if (elementContacted != "tronk" || !toolOpen) return;

    if (currentTool === toolNeeded) {
      setCurrentScreen("analyse");
    } else {
      setCurrentDialogue("wrongTool");
    }
  };

  const handleMouseOver = () => {
    if (elementContacted != "tronk" || !toolOpen) return;
    c_AudioUI.play("hover");
    setOutlineColor("#7b5cff");
    setSmthgIsHovered("interactable");
  };

  const handleMouseOut = () => {
    setSmthgIsHovered(false);
    setOutlineColor("lightblue");
  };

  useEffect(() => {
    if (!toolOpen) {
      setOutlineColor("lightblue");
    }
  }, [toolOpen]);

  useEffect(() => {
    setTronkPosition(tronkRef.current.position);
  }, []);

  return (
    // <PivotControls
    //   anchor={[0, 0, 0]}
    //   depthTest={false}
    //   onDrag={(localMatrix) => {
    //     const position = new THREE.Vector3();
    //     position.setFromMatrixPosition(localMatrix);
    //     console.log("real position:", position);
    //   }}
    // >
    <group {...props} dispose={null} position={[28.892, 3.715, -10.492]} scale={1.2} ref={tronkRef}>
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes["+tronk"].geometry}
        material={materials["+Tronk"]}
        onClick={handleClick}
        onPointerEnter={handleMouseOver}
        onPointerLeave={handleMouseOut}
      >
        {elementContacted === "tronk" && <Outlines thickness={2} color={outlineColor} />}
      </mesh>
      {/* <Sparkles size={1} count={50} speed={1} scale={[1, 1, 1]} /> */}

      <Sparkles
        size={1.5}
        depthWrite={true}
        color={"lightblue"}
        transparent
        count={25}
        speed={0.5}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        toneMapped={false}
        noise={1}
      />

      <PressButtonUI element="tronk" />
    </group>
    // </PivotControls>
  );
}

// useGLTF.preload("/assets/3DModels/Interactive/tronk_new.glb");
