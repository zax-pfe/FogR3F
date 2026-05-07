import React, { use } from "react";
import { useGameStore } from "../../../../store/store.js";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { OrbitControls, useGLTF, Float, Image, Environment } from "@react-three/drei";

import { useFrame, Canvas } from "@react-three/fiber";
import vertexShader from "../../../../shaders/transitionScreen/vertex.glsl?raw";
import fragmenShader from "../../../../shaders/transitionScreen/fragment.glsl?raw";
import { useControls, button } from "leva";
import s from "./ScreenTransition.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMotionValue, animate } from "framer-motion";
// import ScreenTransitionElement from "./ScreenTransitionElement";

export default function ScreenTransition() {
  return (
    <div className={s.screenTransition}>
      <Canvas
        style={{ pointerEvents: "none" }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.sRGBEncoding,
          alpha: true,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, 0, 6],
        }}
      >
        <ScreenTransitionElement />
      </Canvas>
    </div>
  );
}

function ScreenTransitionElement() {
  const materialRef = useRef();
  const revealProgressRef = useRef({ value: 1.9 });
  const timeLineRef = useRef();
  const [isRevealed, setIsRevealed] = useState(false);
  const currentView = useGameStore((state) => state.currentView);

  const { revealButton } = useControls("transition Screen", {
    playRevealAnimation: button(() => {
      triggerAnimation();
    }),
  });

  function triggerAnimation() {
    const tl = timeLineRef.current;
    if (!tl) return;

    if (isRevealed) {
      tl.reverse();
    } else {
      tl.play();
    }

    setIsRevealed((prev) => !prev);
  }

  useGSAP(() => {
    timeLineRef.current = gsap.timeline({ paused: true });

    timeLineRef.current.to(revealProgressRef.current, {
      value: -1,
      duration: 3,
      ease: "power1.inOut",
    });
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uProgress.value = revealProgressRef.current.value;
  });

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[10, 6, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          transparent={true}
          vertexShader={vertexShader}
          fragmentShader={fragmenShader}
          uniforms={{
            uTime: { value: 0 },
            uProgress: { value: 0 },
          }}
        />
      </mesh>
    </>
  );
}
