import { Canvas } from "@react-three/fiber";
import s from "./ThreeScene.module.css";
import { Suspense } from "react";

const ThreeScene = ({ children }) => {

  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-8.49, 10.13, 63.97],
        rotation: [-0.13, -0.05, -0.002],
      }}
    >
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  );
};

export default ThreeScene;