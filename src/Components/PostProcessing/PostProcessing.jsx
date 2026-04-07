import React from "react";
import {
  EffectComposer,
  ToneMapping,
  Bloom,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { ToneMappingMode, BlendFunction } from "postprocessing";

export default function PostProcessing() {
  const controlDepthOfField = useControls(
    "DepthOfField",
    {
      focusDistance: { value: 0.025, min: 0, max: 1, step: 0.001 },
      focusLength: { value: 0.025, min: 0, max: 1, step: 0.001 },
      bokehScale: { value: 0.2, min: 0, max: 10, step: 0.1 },
    },
    { collapsed: true },
  );
  return (
    <>
      <EffectComposer multisampling={8}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Bloom luminanceThreshold={1.1} mipmapBlur intensity={3} />
        <Vignette
          offset={0.1}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />

        <DepthOfField
          focusDistance={controlDepthOfField.focusDistance}
          focusLength={controlDepthOfField.focusLength}
          bokehScale={controlDepthOfField.bokehScale}
        />
      </EffectComposer>
    </>
  );
}
