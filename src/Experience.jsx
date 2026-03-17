import { OrbitControls } from "@react-three/drei";
import Model from "./Components/Test.jsx";
import Terrain from "./Components/Terrain.jsx";
import CharacterControls from "./Components/CharacterControls.jsx";

import { useThree } from "@react-three/fiber";

import { Center, Sparkles, PivotControls } from "@react-three/drei";
import { useControls, button } from "leva";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import {
  EffectComposer,
  ToneMapping,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { BlendFunction } from "postprocessing";

export default function Experience() {
  const { camera } = useThree();
  console.log("Position caméra:", camera.position);
  console.log("Rotation caméra:", camera.rotation);
  console.log("FOV caméra:", camera.fov);
  // console.log("Aspect caméra:", camera.);

  const controlFog = useControls("Fog", {
    near: { value: 25, min: -15, max: 150, step: 0.1 },
    far: { value: 117, min: 1, max: 150, step: 0.1 },
    color: "#cc7b32",
    scaleModel: { value: 2, min: 1, max: 15, step: 0.1 },
  });

  const controlParticles = useControls("Particles", {
    scale: { value: 90, min: 1, max: 150, step: 1 },
    size: { value: 28, min: 1, max: 100, step: 1 },
    count: { value: 1000, min: 1, max: 2000, step: 1 },
    speed: { value: 1.5, min: 0.01, max: 3, step: 0.01 },
  });

  const characterControls = useControls("Character", {
    scale: { value: 0.6, min: 0.1, max: 10, step: 0.1 },
    x: { value: 0, min: -50, max: 50, step: 0.1 },
    y: { value: -3.7, min: -50, max: 50, step: 0.1 },
    z: { value: 20, min: -50, max: 50, step: 0.1 },
  });

  const controlDepthOfField = useControls("DepthOfField", {
    focusDistance: { value: 0.025, min: 0, max: 1, step: 0.001 },
    focusLength: { value: 0.025, min: 0, max: 1, step: 0.001 },
    bokehScale: { value: 6, min: 0, max: 10, step: 0.1 },
  });
  return (
    <>
      <fog
        attach="fog"
        args={[controlFog.color, controlFog.near, controlFog.far]}
      />
      <color attach="background" args={[controlFog.color]} />
      <EffectComposer multisampling={8}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Bloom luminanceThreshold={1.1} mipmapBlur intensity={1.5} />
        <Vignette
          offset={0.1}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
        {/* <Vignette
          offset={0.2}
          darkness={0.4}
          blendFunction={BlendFunction.MULTIPLY}
        /> */}

        <DepthOfField
          focusDistance={controlDepthOfField.focusDistance}
          focusLength={controlDepthOfField.focusLength}
          bokehScale={controlDepthOfField.bokehScale}
        />
      </EffectComposer>

      <OrbitControls makeDefault />
      <Perf position="top-left" />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Center>
        <Terrain scale={controlFog.scaleModel} />
        <CharacterControls />

        {/* <PivotControls depthTest={false}> */}
        <Sparkles
          size={controlParticles.size}
          count={controlParticles.count}
          scale={[
            controlParticles.scale,
            controlParticles.scale,
            controlParticles.scale,
          ]}
          position={[0, 5, 0]}
          speed={controlParticles.speed}
          color={controlFog.color}
          // opacity={1}
        />
        {/* </PivotControls> */}
      </Center>
    </>
  );
}
