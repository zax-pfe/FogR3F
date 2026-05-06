import React, { use, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail, useHelper, Float } from "@react-three/drei";
import * as THREE from "three";

import { extend } from "@react-three/fiber";
import { MeshLineMaterial } from "meshline";
import { useGameStore } from "../../store/store";

import { MolecBody } from "./MolecBody.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

extend({ MeshLineMaterial });

export default function MolecTest({ targetRef }) {
  const meshRef = useRef();
  const lightRef = useRef();
  const pointLightRef = useRef();
  const desired = useRef(new THREE.Vector3());
  const playerPosition = useGameStore((state) => state.playerPosition);
  const [initialized, setInitialized] = useState(false);

  const whoSpeaks = useGameStore((state) => state.whoSpeaks);

  // useHelper(lightRef, THREE.PointLightHelper, 0.4, "#38ff15");
  const target = new THREE.Vector3();

  const timedelay = 0.1; // Délai en secondes
  const timeCounter = useRef(0);
  const speakState = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current || !playerPosition) {
      // console.warn("Mesh  not found");
      return;
    }
    desired.current.copy(playerPosition).add(new THREE.Vector3(-0.6, 0.2, 0));
    if (!initialized) {
      meshRef.current.position.copy(desired.current);
      setInitialized(true);
    }

    const followSpeed = 1.8; // plus petit = plus lent
    const t = 1 - Math.exp(-followSpeed * delta);

    meshRef.current.position.lerp(desired.current, t);
    target.copy(playerPosition);

    if (meshRef.current.position.distanceTo(target) > 0.001) {
      meshRef.current.lookAt(target);
      meshRef.current.rotateY(-Math.PI / 2);
    }

    if (whoSpeaks === "MOLEC") {
      const time = state.clock.getElapsedTime();
      timeCounter.current += delta;
      if (timeCounter.current >= timedelay) {
        timeCounter.current = 0;
        if (speakState.current === 1) {
          pointLightRef.current.color.set("#4f92e3");
          pointLightRef.current.intensity = 30 * Math.random();
          speakState.current = 0;
        } else {
          pointLightRef.current.color.set("#6a4fe3");
          pointLightRef.current.intensity = 30 * Math.random();
          speakState.current = 1;
        }
      }
    } else {
      pointLightRef.current.color.set("#b94fe3");
      pointLightRef.current.intensity = 30;
      speakState.current = 0;
    }
  });

  // useGSAP(() => {
  //   const tl = gsap.timeline({ repeat: -1, yoyo: true });
  //   tl.to(pointLightRef.current, {
  //     color: {
  //       r: whoSpeaks === "MOLEC" ? 0.36 : 0.22,
  //       g: whoSpeaks === "MOLEC" ? 0.71 : 0.74,
  //       b: whoSpeaks === "MOLEC" ? 0.84 : 0.3,
  //     },
  //     intensity: whoSpeaks === "MOLEC" ? 50 : 10,
  //     duration: 0.5,
  //     ease: "power1.inOut",
  //   });
  //   return tl;
  // }, [whoSpeaks]);

  return (
    <Trail
      width={10}
      color={"lightblue"}
      length={4}
      decay={0.1}
      local={true}
      stride={0}
      interval={1}
      attenuation={(t) => t * t}
    >
      <meshLineMaterial
        color="#cb8de3"
        transparent
        opacity={0.2}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        lineWidth={0.35}
      />
      {/* <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}> */}
      <MolecBody ref={meshRef} scale={0.12}>
        <pointLight
          color={"#b94fe3"}
          intensity={30}
          distance={0.1}
          position={[0, 0, 0]}
          ref={pointLightRef}
        />

        <pointLight
          ref={lightRef}
          color="#ebebf3"
          intensity={10}
          distance={100}
          position={[-4, 7, -12]}
        />
      </MolecBody>
      {/* </Float> */}
    </Trail>
  );
}
