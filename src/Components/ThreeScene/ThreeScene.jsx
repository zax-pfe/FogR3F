import { Canvas } from "@react-three/fiber";
import s from "./ThreeScene.module.scss";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import { Environment, OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import { Loader } from "@react-three/drei";

const keyBoardMap = [
  { name: "forward", keys: ["z", "ArrowUp"] },
  { name: "backward", keys: ["s", "ArrowDown"] },
  { name: "left", keys: ["q", "ArrowLeft"] },
  { name: "right", keys: ["d", "ArrowRight"] },
];

const ThreeScene = ({ children }) => {
  const shadowCameraRef = useRef();

  return (
    <>
      <KeyboardControls map={keyBoardMap}>
        <Canvas
          shadows
          framerate={60}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-8.49, 10.13, 63.97],
            rotation: [-0.13, -0.05, -0.002],
          }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
          }}
        >
          <Suspense fallback={null}>{children}</Suspense>
          {/* <Environment preset="night" /> */}
        </Canvas>
      </KeyboardControls>
      {/* <Loader /> */}
    </>
  );
};

export default ThreeScene;
