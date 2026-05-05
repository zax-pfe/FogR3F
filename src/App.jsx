import { useEffect, Suspense, useState } from "react";
import { useProgress } from "@react-three/drei";
import Experience from "./Experience";
import ThreeScene from "./Components/ThreeScene/ThreeScene";
import ThreeAnalyse from "./Components/Interface/View/TreeAnalyse/TreeAnalyse";

import Hud from "./Components/Interface/Hud/Hud";
import { int } from "three/tsl";
import { useGameStore } from "./store/store";
import { convertSRT } from "./utils/convertSRT";
import SubtitleManager from "./Components/Interface/SubtitleManager/SubtitleManager";
import AudioController from "./Components/AudioController";
import LoadingScreen from "./Components/Interface/View/LoadingScreen/LoadingScreen";
import StartScreen from "./Components/Interface/View/StartScreen/StartScreen";
import { preloadMediaAssets } from "./utils/assetsPreloader";

// const keys = {
//   left: "arrowleft",
//   right: "arrowright",
//   forward: "arrowup",
//   backward: "arrowdown",
//   interact: "a",
// };

function App() {
  const { active, progress, loaded, total, item } = useProgress();
  const { currentScreen, setCurrentScreen, mediaFinished,
    setMediaLoading } = useGameStore();
  // for current screen - loading | menu | game

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
        setCurrentScreen("menu");
      }, 500);

      return () => clearTimeout(timeout);
    } 
  }, [active, progress, currentScreen, mediaFinished]); 

  return (
    <>
      {currentScreen === "loading" && <LoadingScreen />}

      {currentScreen === "menu" && (
        <StartScreen />
      )}

       <ThreeScene>
        <Experience />
      </ThreeScene>

      {currentScreen === "game" && (
        <>
          <ThreeAnalyse />
          <Hud />
          <SubtitleManager />
          <AudioController />
        </>
      )}
    </>
  );
}

export default App;