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
// import { Perf } from "r3f-perf";
import Button from "../../Design/Button/Button";
import Text from "../../Design/Text/Text";
import { useGameStore } from "../../../../store/store";
import ParticlesShader from "../../../VFX/ParticlesShader";
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
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.sRGBEncoding,
          }}
          style={{ background: "#252922" }}
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

  function handlePlayClick() {
    setCurrentScreen("game");
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
  const vertexShader = useLoader(FileLoader, "../../shaders/fogStartScreen/vertex.glsl");
  const fragmentShader = useLoader(FileLoader, "../../shaders/fogStartScreen/fragment.glsl");
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
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
