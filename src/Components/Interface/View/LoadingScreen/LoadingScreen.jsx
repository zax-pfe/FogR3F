import s from "./LoadingScreen.module.scss";
import { useFrame, useThree, extend, Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "../../../../store/store";
import { useProgress } from "@react-three/drei";
import Button from "../../Design/Button/Button";
import { Sparkles } from "@react-three/drei"; 
import CustomText from "../../Design/Text/Text"; 

const LoadingScreen = ({ showButton }) => {
  const { progress, loaded, total } = useProgress();

  const mediaProgress = useGameStore((state) => state.mediaProgress);
  const mediaLoaded = useGameStore((state) => state.mediaLoaded);
  const mediaTotal = useGameStore((state) => state.mediaTotal);
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);
  const setUserConfiguration = useGameStore((state) => state.setUserConfiguration);

  const hasMedia = mediaTotal > 0;

  const finalProgress = hasMedia ? progress * 0.7 + mediaProgress * 0.3 : progress;

  const setupConfiguration = (config) => {
    setUserConfiguration(config);
    setCurrentScreen("menu");
  }

  return (
    <div className={s.loadingScreen}>
      {/* <Canvas
        dpr={[1, 2]}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
          zIndex: 12,
          pointerEvents: "none",
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, -3, 18],
        }}
        className={s.canvas}
      >
        <Sparkles count={100} scale={[80, 30, 80]} size={18} speed={0.8} opacity={1} noise={4} color="#ffffff" />
      </Canvas> */}
      <div className={s.loadingContent}>
        {!showButton ? (
          <>
            <video
              className={s.loadingVideo}
              src="/assets/video/loading.webm"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className={s.loadingData}>
              <CustomText variant="b1">Chargement {Math.round(progress)}%</CustomText>
            </div>
          </>
        ) : (
          <>
          <CustomText variant="h1">Paramètres graphiques</CustomText>

            <div className={s.buttonsWrapper}>
              <Button onClick={() => setupConfiguration("low")}>
                Faible
              </Button>
              <Button onClick={() => setupConfiguration("medium")}>
                Moyenne
              </Button>
              <Button onClick={() => setupConfiguration("high")}>
                Élevée
              </Button>
            </div>
          </>
        )}
      </div>
 
      <div className={s.headphones}>
        <img src="/assets/images/headphones.svg" alt="" />
        <CustomText variant="b1">
          Pour une meilleure expérience, nous vous recommandons d’utiliser un casque audio.
        </CustomText>
      </div>
 
    </div>
  );
};

export default LoadingScreen;
