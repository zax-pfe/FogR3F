import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import ThreeScene from "./Components/ThreeScene/ThreeScene";
import ThreeAnalyse from "./Components/Interface/View/TreeAnalyse/TreeAnalyse";

import Hud from "./Components/Interface/Hud/Hud";
import { int } from "three/tsl";
import { useGameStore } from "./store/store";
import { convertSRT } from "./utils/convertSRT";
import SubtitleManager from "./Components/Interface/SubtitleManager/SubtitleManager";
import AudioController from "./Components/AudioController";
import StartScreen from "./Components/Interface/View/StartScreen/StartScreen";

function App() {
  const currentView = useGameStore((state) => state.currentView);

  return (
    <>
      {currentView === "startScreen" && <StartScreen />}
      {currentView === "game" && (
        <>
          <ThreeScene>
            <Experience />
          </ThreeScene>
          <ThreeAnalyse />
          <Hud />
          <SubtitleManager />
          <AudioController />
        </>
      )}

      {/* <Loader /> */}
    </>
  );
}

export default App;
