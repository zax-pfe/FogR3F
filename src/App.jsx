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
import CustomCursor from "./Components/Interface/Design/CustomCursor/CustomCursor";
import ScreenTransition from "./Components/Interface/View/ScreenTransition/ScreenTransition";

// const keys = {
//   left: "arrowleft",
//   right: "arrowright",
//   forward: "arrowup",
//   backward: "arrowdown",
//   interact: "a",
// };

function App() {
  const { active, progress, loaded, total, item } = useProgress();
  // const { currentScreen, setCurrentScreen, mediaFinished, setMediaLoading } = useGameStore();
  const currentScreen = useGameStore((state) => state.currentScreen);
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);
  const mediaFinished = useGameStore((state) => state.mediaFinished);
  const setMediaLoading = useGameStore((state) => state.setMediaLoading);
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

      {currentScreen === "menu" && <StartScreen />}
      {/* {currentScreen === "menu" && <ScreenTransition />} */}
      <ScreenTransition />
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
