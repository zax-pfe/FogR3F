import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import Experience from "./Experience";
import ThreeScene from "./Components/ThreeScene/ThreeScene";
import ThreeAnalyse from "./Components/Interface/View/TreeAnalyse/TreeAnalyse";

import Hud from "./Components/Interface/Hud/Hud";
import { useGameStore } from "./store/store";
import SubtitleManager from "./Components/Interface/SubtitleManager/SubtitleManager";
import AudioController from "./Components/AudioController";
import LoadingScreen from "./Components/Interface/View/LoadingScreen/LoadingScreen";
import StartScreen from "./Components/Interface/View/StartScreen/StartScreen";
import { preloadMediaAssets } from "./utils/assetsPreloader";
import CustomCursor from "./Components/Interface/Design/CustomCursor/CustomCursor";

// const keys = {
//   left: "arrowleft",
//   right: "arrowright",
//   forward: "arrowup",
//   backward: "arrowdown",
//   interact: "a",
// };

function App() {
  const { active, progress, loaded, total } = useProgress();
  // const { currentScreen, setCurrentScreen, mediaFinished, setMediaLoading } = useGameStore();
  const currentScreen = useGameStore((state) => state.currentScreen);
  const mediaFinished = useGameStore((state) => state.mediaFinished);
  const setMediaLoading = useGameStore((state) => state.setMediaLoading);
  // for current screen - loading | menu | game

  const [ showButton, setShowButton] = useState(false);

  useEffect(() => {
    preloadMediaAssets((data) => {
      setMediaLoading({
        mediaProgress: data.progress,
        mediaLoaded: data.loaded,
        mediaTotal: data.total,
        mediaItem: data.item,
        mediaFinished: data.finished,
      });
    });
  }, [setMediaLoading]);

  useEffect(() => {
    if (!active && progress === 100 && currentScreen === "loading" && mediaFinished) {
      const timeout = setTimeout(() => { 
        setShowButton(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [active, progress, currentScreen, mediaFinished]);

  return (
    <>
      {currentScreen === "loading" && <LoadingScreen showButton={showButton} />}

      {currentScreen === "menu" && <StartScreen />}

      <ThreeScene>
        <Experience />
      </ThreeScene>

      <ThreeAnalyse />
      {currentScreen === "game" && <Hud />}
      <SubtitleManager />
      <AudioController />
      <CustomCursor />
    </>
  );
}

export default App;
