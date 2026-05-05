import s from "./StartScreen.module.scss";
import { useFrame, useThree, extend, Canvas, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitControls, useGLTF, Float } from "@react-three/drei";
import { EffectComposer, ToneMapping, Bloom, Vignette, DepthOfField, Noise } from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";
import { useControls } from "leva";
import { FileLoader } from "three";

const StartScreen = () => {
  return (
    <div className={s.startScreen}>
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
          position: [0, 2, 10],
        }}
      >
        <StartScreenContent />
      </Canvas>
    </div>
  );
};

export default StartScreen;

function StartScreenContent() {
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
    const maxRot = Math.PI / 5;

    targetRotation.current.x = -mouse.y * maxRot;
    targetRotation.current.y = mouse.x * maxRot;

    const lerpFactor = 0.02;

    currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x, lerpFactor);
    currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y, lerpFactor);

    if (groupRef.current) {
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y;
    }
  });

  return (
    <>
      <OrbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={6} />
      <ambientLight intensity={2} />

      <Float speed={2} floatIntensity={0.5} rotationIntensity={1} floatingRange={[1, 1.5]}>
        <group ref={groupRef} scale={2} rotation={[rotation_x, rotation_y, rotation_z]} position={[0, 0, 1.5]}>
          <ModelTextured />
        </group>
      </Float>
      <PostProcessingStartScreen />
      <StartScreenFog />
    </>
  );
}

function PostProcessingStartScreen() {
  return (
    <>
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.15} luminanceThreshold={1.5} luminanceSmoothing={0.05} mipmapBlur resolutionX={512} resolutionY={512} />
        <Vignette offset={0.05} darkness={0.4} blendFunction={BlendFunction.NORMAL} />

        {/* <Noise opacity={0.1} blendFunction={BlendFunction.SOFT_LIGHT} /> */}

        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
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

function ModelTextured(props) {
  const { nodes, materials } = useGLTF("/assets/3DModels/Molec/MolecEmissiveTextured.glb");
  materials.Crystal.emissive = new THREE.Color(0x00ffff);
  materials.Crystal.emissiveIntensity = 10;
  return (
    <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
      <group scale={1.904}>
        <mesh castShadow receiveShadow geometry={nodes.Sphere001.geometry} material={materials["Material.004"]} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere001_1.geometry} material={materials["Material.005"]} />
        <mesh castShadow receiveShadow geometry={nodes.Icosphere001.geometry} material={materials.Crystal} />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/3DModels/Molec/MolecEmissiveTextured.glb");

function StartScreenFog() {
  const vertexShader = useLoader(FileLoader, "../../shaders/fogStartScreen/vertex.glsl");
  const fragmentShader = useLoader(FileLoader, "../../shaders/fogStartScreen/fragment.glsl");
  const materialRef = useRef();
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, 0]} scale={1}>
      {/* <planeGeometry args={[15, 15]} /> */}
      <boxGeometry args={[15, 15, 15]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={true}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
