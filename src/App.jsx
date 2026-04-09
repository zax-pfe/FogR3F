import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import ThreeScene from "./Components/ThreeScene/ThreeScene";
import ThreeAnalyse from "./Components/Interface/View/TreeAnalyse/TreeAnalyse";

import { KeyboardControls } from "@react-three/drei";
import Hud from "./Components/Interface/Hud/Hud";
import { int } from "three/tsl";

const keys = {
  left: "arrowleft",
  right: "arrowright",
  forward: "arrowup",
  backward: "arrowdown",
  interact: "a",
};

function App() {
  return (
    <>
      <ThreeScene placeholder>
        <Experience />
      </ThreeScene>
      <ThreeAnalyse />
      <Hud />
      {/* <Loader /> */}
    </>
  );
}

export default App;
