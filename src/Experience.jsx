import { OrbitControls } from "@react-three/drei";
import Terrain from "./Components/3DModel/Terrain.jsx";
import CharacterController from "./Components/CharacterController.jsx";
import { useThree, useFrame } from "@react-three/fiber";
import Cristal from "./Components/3DModel/Cristal.jsx";
import { Center, Sparkles, PivotControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import InvisibleWall from "./Components/InvisibleWall.jsx";
import * as THREE from "three";
import Particles from "./Components/VFX/Particles.jsx";

import { Physics } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import PostProcessing from "./Components/PostProcessing/PostProcessing.jsx";
import VFX from "./Components/VFX/VFX.jsx";

import MolecTest from "./Components/3DModel/MolecTest.jsx";

import Lights from "./Components/Lights/Lights.jsx";
import Smoke from "./Components/3DModel/Smoke.jsx";
import CalculateDistance from "./Components/Utils/CalculateDistance.jsx";

export default function Experience() {
  // ______________________ LOG CAMERA POSITION __________________/
  const { camera } = useThree();
  // console.log("Position caméra:", camera.position);
  // console.log("Rotation caméra:", camera.rotation);
  // console.log("FOV caméra:", camera.fov);
  // console.log("Aspect caméra:", camera.);

  // ______________________ VARIABLES __________________/

  const characterRef = useRef();
  const cristalRef = useRef();

  // ______________________ LEVA CONTROLS __________________/
  const controlFog = useControls("Fog", {
    near: { value: -15, min: -15, max: 150, step: 0.1 },
    far: { value: 61, min: 1, max: 150, step: 0.1 },
    color: "#cc7b32",
    scaleModel: { value: 2, min: 1, max: 15, step: 0.1 },
  });

  // const characterControls = useControls("Character", {
  //   scale: { value: 0.6, min: 0.1, max: 10, step: 0.1 },
  //   x: { value: 0, min: -50, max: 50, step: 0.1 },
  //   y: { value: -3.7, min: -50, max: 50, step: 0.1 },
  //   z: { value: 20, min: -50, max: 50, step: 0.1 },
  // });

  return (
    <>
      {/* ______________________ FOG__________________/ */}
      <fog
        attach="fog"
        args={[controlFog.color, controlFog.near, controlFog.far]}
      />
      <color attach="background" args={[controlFog.color]} />
      {/* ______________________ POST PROCESSING__________________/ */}
      <PostProcessing />
      {/* ______________________ SETUP __________________/ */}
      <OrbitControls makeDefault />
      <Perf position="top-left" />
      <Lights />
      <CalculateDistance />
      {/* ______________________ MODELS __________________/ */}
      <Physics>
        <Center>
          <Terrain scale={controlFog.scaleModel} />
          <CharacterController ref={characterRef} />
          <Cristal position={[0, 7, 0]} ref={cristalRef} />
          <PivotControls anchor={[0, 0, 0]} depthTest={false}>
            <InvisibleWall />
          </PivotControls>
        </Center>
      </Physics>
      <Smoke />
      <MolecTest targetRef={characterRef} />
      {/* ______________________ VFX __________________/ */}
      {/* <VFX particlesColor={controlFog.color} /> */}
      <Particles />
    </>
  );
}
