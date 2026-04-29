import React from "react";
import {
  EffectComposer,
  ToneMapping,
  Bloom,
  Vignette,
  DepthOfField,
   Noise
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
      <EffectComposer multisampling={0}>
        
        <Bloom 
            intensity={0.25}
            luminanceThreshold={1.5}
            luminanceSmoothing={0.05}
            mipmapBlur
            resolutionX={512}
            resolutionY={512}
         />
        <Vignette
          offset={0.05}
          darkness={0.4}
          blendFunction={BlendFunction.NORMAL}
        />

        <Noise
          opacity={0.2}
          blendFunction={BlendFunction.SOFT_LIGHT}
        />

        {/* <DepthOfField
          focusDistance={controlDepthOfField.focusDistance}
          focusLength={controlDepthOfField.focusLength}
          bokehScale={controlDepthOfField.bokehScale}
        /> */}
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
}
