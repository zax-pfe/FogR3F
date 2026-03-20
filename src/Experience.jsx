//imports par def
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Center, Sparkles, PivotControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

//Post prod
import { ToneMappingMode, BlendFunction } from "postprocessing";
import { Physics } from "@react-three/rapier";
import {
  EffectComposer,
  ToneMapping,
  Bloom,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";

//components
import Terrain from "./Components/3DModel/Terrain.jsx";
import CharacterController from "./Components/CharacterController.jsx";
import Cristal from "./Components/3DModel/Cristal.jsx";
import Trees from "./Components/3DModel/Trees.jsx";


export default function Experience() {
  // ______________________ LOG CAMERA POSITION __________________/
  const { camera } = useThree();
  // console.log("Position caméra:", camera.position);
  // console.log("Rotation caméra:", camera.rotation);
  // console.log("FOV caméra:", camera.fov);
  // console.log("Aspect caméra:", camera.);

  // ______________________ LEVA CONTROLS __________________/
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
    bokehScale: { value: 0.2, min: 0, max: 10, step: 0.1 },
  });


  return (
    <>
      <fog
        attach="fog"
        args={[controlFog.color, controlFog.near, controlFog.far]}
      />
      <color attach="background" args={[controlFog.color]} />
      {/* ______________________ POST PROCESSING__________________/ */}
      {/* <EffectComposer multisampling={8}> */}
        {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Bloom luminanceThreshold={1.1} mipmapBlur intensity={1.5} />
        <Vignette
          offset={0.1}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        /> */}

        {/* <DepthOfField
          focusDistance={controlDepthOfField.focusDistance}
          focusLength={controlDepthOfField.focusLength}
          bokehScale={controlDepthOfField.bokehScale}
        /> */}
      {/* </EffectComposer> */}

      {/* ______________________ SETUP __________________/ */}

      <OrbitControls makeDefault />
      <Perf position="top-left" />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* ______________________ MODELS __________________/ */}

      <Physics>
        <Center>
          <Terrain scale={controlFog.scaleModel} />
          <CharacterController />
          <Cristal position={[0, 10, 0]} />
          <Trees scale={controlFog.scaleModel} />
        </Center>
      </Physics>

      {/* ______________________ VFX __________________/ */}

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
      />
    </>
  );
}
