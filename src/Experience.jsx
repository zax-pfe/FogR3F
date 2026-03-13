import { OrbitControls } from "@react-three/drei";
import Model from "./Components/Test.jsx";
import Character from "./Components/Character.jsx";

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
  const controlFog = useControls("Fog", {
    near: { value: 0, min: -15, max: 150, step: 0.1 },
    far: { value: 2, min: 1, max: 150, step: 0.1 },
    color: "#cc7b32",
    scaleModel: { value: 1, min: 1, max: 10, step: 0.1 },
  });

  const controlParticles = useControls("Particles", {
    scale: { value: 20, min: 1, max: 150, step: 1 },
    size: { value: 6, min: 1, max: 100, step: 1 },
    count: { value: 300, min: 1, max: 1000, step: 1 },
    speed: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
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
        {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
        {/* <Bloom luminanceThreshold={1.1} mipmapBlur intensity={1.5} /> */}
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Vignette
          offset={0.2}
          darkness={0.4}
          blendFunction={BlendFunction.MULTIPLY}
        /> */}

        {/* <DepthOfField
          focusDistance={controlDepthOfField.focusDistance}
          focusLength={controlDepthOfField.focusLength}
          bokehScale={controlDepthOfField.bokehScale}
        /> */}
      </EffectComposer>

      <OrbitControls makeDefault />
      <Perf position="top-left" />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Center>
        <Model scale={controlFog.scaleModel} />
        <PivotControls depthTest={false}>
          <Character />
        </PivotControls>

        <PivotControls depthTest={false}>
          <Sparkles
            size={controlParticles.size}
            count={controlParticles.count}
            scale={[
              controlParticles.scale,
              controlParticles.scale,
              controlParticles.scale,
            ]}
            position={[0, 1, 0]}
            speed={controlParticles.speed}
            color={controlFog.color}
            // opacity={1}
          />
        </PivotControls>
      </Center>
    </>
  );
}
