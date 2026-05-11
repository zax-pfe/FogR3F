// ______________________ REACT & FIBER & DREI & UTILS __________________/
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useThree, useFrame } from "@react-three/fiber";
import { Center, Sparkles, PivotControls } from "@react-three/drei";
// import { Perf } from "r3f-perf";
import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import { use, useEffect, useRef, useState } from "react";
import { useGameStore } from "./store/store.js";
import { Environment } from "@react-three/drei";

// ______________________ 3D MODELS __________________/
import Terrain from "./Components/3DModel/Terrain.jsx";
import CharacterController from "./Components/CharacterController.jsx";
import MolecTest from "./Components/3DModel/MolecTest.jsx";

// ________ POINTS OF INTEREST ________/
import Interaction from "./Components/3DModel/PointsOfInterest/Interaction.jsx";
import Pointer from "./Components/3DModel/PointsOfInterest/Pointer.jsx";
import AmmoBox from "./Components/3DModel/PointsOfInterest/AmmoBox.jsx";
import BrokenRobot from "./Components/3DModel/PointsOfInterest/BrokenRobot.jsx";
import Poster from "./Components/3DModel/PointsOfInterest/Poster.jsx";
import Tronk from "./Components/3DModel/PointsOfInterest/Tronk.jsx";
import Swing from "./Components/3DModel/PointsOfInterest/Swing.jsx";
import Tank from "./Components/3DModel/PointsOfInterest/Tank.jsx";
import Peluche from "./Components/3DModel/PointsOfInterest/Peluche.jsx";

// ______________________ EXPERIENCE __________________/
import Particles from "./Components/VFX/Particles.jsx";
import ParticlesShader from "./Components/VFX/ParticlesShader.jsx";
import PostProcessing from "./Components/PostProcessing/PostProcessing.jsx";
import Lights from "./Components/Lights/Lights.jsx";
import Smoke from "./Components/3DModel/Smoke.jsx";
import CalculateDistance from "./Components/Utils/CalculateDistance.jsx";
import Decors from "./Components/3DModel/Decors.jsx";
import Trees from "./Components/3DModel/Trees.jsx";
import GroundFog from "./Components/3DModel/GroundFog.jsx";
import Fog from "./Components/3DModel/Fog.jsx";

export default function Experience() {
  // ______________________ LOG CAMERA POSITION __________________/
  const { camera } = useThree();

  // ______________________ VARIABLES __________________/

  const characterRef = useRef();
  const controlsRef = useRef();

  // ______________ ZUSTAND _____________/
  const setControlsRef = useGameStore((state) => state.setControlsRef);
  const userConfiguration = useGameStore((state) => state.userConfiguration);

  useEffect(() => {
    setControlsRef(controlsRef);
  }, [setControlsRef]);

  // ______________________ LEVA CONTROLS __________________/
  const controlFog = useControls("Fog", {
    near: { value: -15, min: -15, max: 150, step: 0.1 },
    far: { value: 61, min: 1, max: 150, step: 0.1 },
    color: "#49636d", // "#4c5559"
    scaleModel: { value: 2, min: 1, max: 15, step: 0.1 },
  });

  // const characterControls = useControls("Character", {
  //   scale: { value: 0.6, min: 0.1, max: 10, step: 0.1 },
  //   x: { value: 0, min: -50, max: 50, step: 0.1 },
  //   y: { value: -3.7, min: -50, max: 50, step: 0.1 },
  //   z: { value: 20, min: -50, max: 50, step: 0.1 },
  // });

  const { CAMERA_LOCK } = useControls("camera lock ", {
    CAMERA_LOCK: true,
  });

  return (
    <>
      {/* ____________ ENVIRONMENT ____________ A desactiver pour eco des perf */}
      {userConfiguration === "high" && <Environment preset="night" />}
      {/* ______________________ FOG__________________/ */}
      <fog attach="fog" args={[controlFog.color, controlFog.near, controlFog.far]} />
      <color attach="background" args={[controlFog.color]} />
      {/* ______________________ POST PROCESSING__________________/ */}
      {userConfiguration !== "low" && <PostProcessing />}
      {/* ______________________ SETUP __________________/ */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        minPolarAngle={CAMERA_LOCK ? Math.PI / 6 : 0} // empêche de regarder trop vers le bas
        maxPolarAngle={CAMERA_LOCK ? Math.PI / 2.4 : Math.PI} // empêche de regarder trop vers le haut
        enableZoom={CAMERA_LOCK ? false : true}
      />
      {/* <Perf position="top-left" /> */}
      <Lights />
      <CalculateDistance />
      {/* ______________________ MODELS __________________/ */}
      {/* _____________ INTERACTION __________/ */}

      <Pointer />
      <AmmoBox />
      <Tronk />
      <BrokenRobot />
      <Poster />
      <Swing />
      <Peluche />
      <Interaction />
      <Physics gravity={[0, -30, 0]}>
        <Tank />
        <Terrain />
        <Decors />
        <Trees />
        <CharacterController ref={characterRef} />
      </Physics>
      {userConfiguration === "high" && <Smoke />}
      <Fog />
      <MolecTest targetRef={characterRef} />
      {/* ______________________ VFX __________________/ */}
      {/* <VFX particlesColor={controlFog.color} /> */}
      {userConfiguration !== "low" && (
        <ParticlesShader
          size={{ x: 60, y: 6, z: 57 }}
          scale={1}
          count={2000}
          color="#7298a7"
          position={{ x: 11.3, y: 5.5, z: 5.4 }}
          speed={2}
          opacity={1}
        />
      )}
    </>
  );
}
