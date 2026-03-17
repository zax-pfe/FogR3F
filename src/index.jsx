import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";

const root = ReactDOM.createRoot(document.querySelector("#root"));

import { KeyboardControls } from "@react-three/drei";

const keys = {
  left: "arrowleft",
  right: "arrowright",
  forward: "arrowup",
  backward: "arrowdown",
};

root.render(
  <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    ]}
  >
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
        <Experience />
      </Suspense>
    </Canvas>
    {/* <Loader /> */}
  </KeyboardControls>,
);
