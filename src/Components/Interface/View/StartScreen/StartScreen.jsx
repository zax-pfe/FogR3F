// ______________________ REACT & FIBER & DREI & UTILS __________________/
import s from "./StartScreen.module.scss";
import { useFrame, useThree, extend, Canvas, useLoader } from "@react-three/fiber";
import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls, useGLTF, Float, Image, Environment } from "@react-three/drei";
import {
  EffectComposer,
  ToneMapping,
  Bloom,
  Vignette,
  DepthOfField,
  Noise,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";

import { useControls } from "leva";
import { FileLoader } from "three";
import { useGameStore } from "../../../../store/store";

// ______________________ UI & EFFECTS __________________/
import ParticlesShader from "../../../VFX/ParticlesShader";
import Button from "../../Design/Button/Button";
import CustomText from "../../Design/Text/Text";
import vertexShaderFog from "../../../../shaders/fogStartScreen/vertex.glsl?raw";
import fragmentShaderFog from "../../../../shaders/fogStartScreen/fragment.glsl?raw";

{
  /* ______________________ CANVAS __________________/ */
}

const StartScreen = () => {
  // const [buttonHovered, setButtonHovered] = useState("none");

  const buttonHoveredRef = useRef("none");

  const handleHover = useCallback((value) => {
    buttonHoveredRef.current = value;
  }, []);

  return (
    <>

      <InterfaceOverlay onHover={handleHover} />

      <div className={s.startScreen}>
        <div className={s.svgContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1603 1080" fill="none">
            <ellipse cx="803.822" cy="469.695" rx="681.469" ry="680.695" fill="#435853" fillOpacity="0.29" />
            <ellipse cx="679.92" cy="523.128" rx="679.92" ry="681.469" fill="#4FD1C5" fillOpacity="0.02" />
            <ellipse cx="747.309" cy="609.436" rx="681.469" ry="680.695" fill="#435853" fillOpacity="0.08" />
            <ellipse cx="881.263" cy="581.208" rx="681.469" ry="680.695" fill="#1A2F2A" fillOpacity="0.34" />
            <circle cx="923.08" cy="495.25" r="679.92" fill="#192A2E" fillOpacity="0.21" />
            <g filter="url(#filter0_i_837_1182)">
              <ellipse cx="803.822" cy="544.811" rx="681.469" ry="679.92" fill="#070D0C" />
            </g>
            <defs>
              <filter id="filter0_i_837_1182" x="122.354" y="-135.109" width="1362.94" height="1363.84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feMorphology radius="54" operator="dilate" in="SourceAlpha" result="effect1_innerShadow_837_1182" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="65.65" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.786358 0 0 0 0 1 0 0 0 0 0.980279 0 0 0 1 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_837_1182" />
              </filter>
            </defs>
          </svg>
        </div>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.sRGBEncoding,
          }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 100,
            position: [0, -3, 18],
          }}
        >
          <StartScreenContent buttonHoveredRef={buttonHoveredRef} />
        </Canvas>

      </div>

    </>
  );
};
export default StartScreen;

{
  /* ______________________ INTERFACE __________________/ */
}

function InterfaceOverlay({ onHover }) {
  // const { currentScreen, setCurrentScreen } = useGameStore();
  const currentScreen = useGameStore((state) => state.currentScreen);
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);
  const setTransitionView = useGameStore((state) => state.setTransitionView);

  function handlePlayClick() {
    setTransitionView("game");
  }

  return (
    <div className={s.startScreen__interface}>
      <div
        className={s.startScreen__button}
        onMouseEnter={() => onHover("play")}
        onMouseLeave={() => onHover("none")}
      >
        <Button onClick={handlePlayClick}>Reprendre</Button>
      </div>
      {/* <div className={s.startScreen__button} onMouseEnter={() => onHover("credit")} onMouseLeave={() => onHover("none")}>
        <Button>Credit</Button>
      </div> */}
    </div>
  );
}

{
  /* ______________________ TITLE __________________/ */
}

function Title() {
  const imagePath = "/assets/images/starting_screen/Milaghail.png";
  const titleRef = useRef(null);
  return (
    <Image
      url={imagePath}
      // depthWrite={true}
      ref={titleRef}
      transparent
      position={[0, -3, -2]}
      scale={[17, 5, 1]}
      rotation={[-Math.PI / 15, 0, 0]}
      side={THREE.DoubleSide}
    />
  );
}

{
  /* ______________________ EXPERIENCE __________________/ */
}
function StartScreenContent({ buttonHoveredRef }) {
  const { camera, gl, mouse } = useThree();
  const sphereRef = useRef();
  const groupRef = useRef();
  const lightRef = useRef();

  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const { rotation_x, rotation_y, rotation_z } = useControls(
    "Start Screen Molec Rotation",
    {
      rotation_x: { value: 0.0, min: -Math.PI / 5, max: Math.PI / 5, step: 0.001 },
      rotation_y: { value: 0.0, min: -Math.PI / 5, max: Math.PI / 5, step: 0.001 },
      rotation_z: { value: 0.0, min: -Math.PI / 5, max: Math.PI / 5, step: 0.001 },
    },
    { collapsed: true },
  );
  {
    /* ______________________ MOUSE ROTATION __________________/ */
  }

  useFrame((state, delta) => {
    camera.lookAt(0, -7.5, 0);

    const maxRot = Math.PI / 5;

    targetRotation.current.x = -mouse.y * maxRot;
    targetRotation.current.y = mouse.x * maxRot;

    const lerpFactor = 0.02;

    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      lerpFactor,
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      lerpFactor,
    );

    if (groupRef.current) {
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y;
    }
  });

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <Environment preset="night" />
      {/* <OrbitControls args={[camera, gl.domElement]} /> */}
      <directionalLight position={[1, 2, 3]} intensity={7} />
      <ambientLight intensity={0} />
      <Title />
      <Float
        speed={2}
        floatIntensity={0.5}
        rotationIntensity={1}
        floatingRange={[1, 1.5]}
        position={[0, -7.5, 1]}
      >
        <group ref={groupRef} scale={5} rotation={[rotation_x, rotation_y, rotation_z]}>
          <ModelTextured buttonHoveredRef={buttonHoveredRef} />
        </group>
      </Float>
      <PostProcessingStartScreen />
      <StartScreenFog />
      <ParticlesShader
        size={{ x: 30, y: 15, z: 8 }}
        scale={5}
        count={200}
        color="#b9a3a3"
        position={{ x: 0, y: -7.5, z: 0 }}
        speed={8}
        opacity={0.2}
      />
    </>
  );
}

{
  /* ______________________ POST PROCESSING __________________/ */
}
function PostProcessingStartScreen() {
  return (
    <>
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.15}
          luminanceThreshold={1.5}
          luminanceSmoothing={0.05}
          mipmapBlur
          resolutionX={512}
          resolutionY={512}
        />
        <Vignette offset={0.5} darkness={0.5} blendFunction={BlendFunction.NORMAL} />

        <Noise opacity={0.1} blendFunction={BlendFunction.SOFT_LIGHT} />

        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
}
{
  /* ______________________ MODEL NON TEXTURED __________________/ */
}
// function ModelTextured(props) {
//   const { nodes, materials } = useGLTF("/assets/3DModels/Molec/MolecEmissive.glb");
//   materials.Crystal.emissive = new THREE.Color(0x00ffff);
//   materials.Crystal.emissiveIntensity = 15;
//   return (
//     <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
//       <group scale={1.904}>
//         <mesh castShadow receiveShadow geometry={nodes.Sphere001.geometry} material={materials["Material.004"]} />
//         <mesh castShadow receiveShadow geometry={nodes.Sphere001_1.geometry} material={materials["Material.005"]} />
//         <mesh castShadow receiveShadow geometry={nodes.Icosphere001.geometry} material={materials.Crystal} />
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/assets/3DModels/Molec/MolecEmissive.glb");

{
  /* ______________________ MODEL TEXTURED __________________/ */
}
function ModelTextured({ buttonHoveredRef, ...props }) {
  const { nodes, materials } = useGLTF("/assets/3DModels/Molec/MolecEmissive.glb");
  const pointLightRef = useRef();
  const colors = {
    play: new THREE.Color(0xff69b4),
    credit: new THREE.Color(0x00f00f),
    none: new THREE.Color(0x00ffff),
  };

  useFrame(() => {
    const color = colors[buttonHoveredRef.current] || colors.none;
    materials.Crystal.emissive = color;
    materials.Crystal.emissiveIntensity = 10;
    if (pointLightRef.current) {
      pointLightRef.current.color = color;
    }
  });

  return (
    <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
      <pointLight ref={pointLightRef} intensity={50} distance={8} />
      <group scale={1.904}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_1.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001.geometry}
          material={materials.Crystal}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/3DModels/Molec/MolecEmissive.glb");

{
  /* ______________________ VOLUMETRIC FOG __________________/ */
}

function StartScreenFog() {
  const materialRef = useRef();

  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh rotation={[0, 0, 0]} position={[0, -7.5, 0]} scale={1}>
      {/* <planeGeometry args={[15, 15]} /> */}
      <boxGeometry args={[30, 15, 8]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uMeshPosition: { value: new THREE.Vector3(0, -7.5, 1.5) },
          uGlowRadius: { value: 7.0 },
          uGlowIntensity: { value: 0.3 },
        }}
        vertexShader={vertexShaderFog}
        fragmentShader={fragmentShaderFog}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
