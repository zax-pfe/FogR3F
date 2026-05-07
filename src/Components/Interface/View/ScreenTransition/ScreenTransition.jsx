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
  const isRevealedRef = useRef(false);
  const transitionView = useGameStore((state) => state.transitionView);
  const setTransitionView = useGameStore((state) => state.setTransitionView);
  const currentScreen = useGameStore((state) => state.currentScreen);
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);
  const revealProgress = useMotionValue(1.9);

  const { revealButton } = useControls("transition Screen", {
    playRevealAnimation: button(() => {
      triggerAnimation();
    }),
  });

  const handleReveal = () => {
    animate(revealProgress, isRevealedRef.current ? 1.9 : -1, {
      duration: 2,
      ease: "easeInOut",
    });
    isRevealedRef.current = !isRevealedRef.current;
  };

  function triggerAnimation() {
    handleReveal();
  }

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uProgress.value = revealProgress.get();
  });

  useEffect(() => {
    console.log("Transition view changed:", transitionView);
    if (transitionView === null) return;

    triggerAnimation();
    setTimeout(() => {
      setCurrentScreen(transitionView);
      setTimeout(() => {
        triggerAnimation();
      }, 1000);
    }, 1500);
    setTransitionView(null);
  }, [transitionView]);

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[12, 6, 32, 32]} />
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
