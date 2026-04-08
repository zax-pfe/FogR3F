import { Canvas } from "@react-three/fiber";
import s from "./ThreeScene.module.scss";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import { Environment, OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import { Loader } from "@react-three/drei";
import Text from "../Interface/Design/Text/Text";

const keyBoardMap = [
  { name: "forward", keys: ["z", "ArrowUp"] },
  { name: "backward", keys: ["s", "ArrowDown"] },
  { name: "left", keys: ["q", "ArrowLeft"] },
  { name: "right", keys: ["d", "ArrowRight"] },
  { name: "interact", keys: ["a", "e"] },
];

const ThreeScene = ({ children, placeholder = false }) => {
  const shadowCameraRef = useRef();

  return placeholder ? (
    <div className={`${s.canvas} ${s.placeholder}`}>
      <Text variant="h1" className={s.placeholder__text}>Ici le jeu</Text>
      <Text>Supprimez la props <span className="txt-italic">"placeholder"</span> de l'objet <span className="txt-medium">ThreeScene</span> pour afficher la scène 3D.</Text>
    </div>
  ) : (
    <>
      <KeyboardControls map={keyBoardMap}>
        <Canvas
          className={s.canvas}
          // shadows
          framerate={60}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-8.49, 20.13, 63.97],
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
