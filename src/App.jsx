import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import ThreeScene from "./Components/ThreeScene/ThreeScene";
import ThreeAnalyse from "./Components/Interface/View/TreeAnalyse/TreeAnalyse";

import { KeyboardControls } from "@react-three/drei";
import Hud from "./Components/Interface/Hud/Hud";
import { int } from "three/tsl";
import { useGameStore } from "./store/store";
import { convertSRT } from "./utils/convertSRT";
import SubtitleManager from "./Components/Interface/SubtitleManager/SubtitleManager";
import AudioController from "./Components/AudioController";

const keys = {
  left: "arrowleft",
  right: "arrowright",
  forward: "arrowup",
  backward: "arrowdown",
  interact: "a",
};

function App() {

  // -- debug pour afficher ou non l'analyse du tronc avec la touche "t" --
  const { showAnalyse, setShowAnalyse } = useGameStore();

  const handleKeyDown = (e) => {
    if (e.key === "t") {
      setShowAnalyse(!showAnalyse);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showAnalyse]);

  return (
    <>
      <ThreeScene>
        <Experience />
      </ThreeScene>
      <ThreeAnalyse />
      <Hud />
      <SubtitleManager />
      <AudioController />
      {/* <Loader /> */}
    </>
  );
}

export default App;
