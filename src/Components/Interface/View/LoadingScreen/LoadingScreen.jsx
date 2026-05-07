import s from "./LoadingScreen.module.scss";
import { useFrame, useThree, extend, Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "../../../../store/store";
import { useProgress } from "@react-three/drei";
import Button from "../../Design/Button/Button";
import { Sparkles } from "@react-three/drei"; 

const LoadingScreen = ({ showButton }) => {
  const { progress, loaded, total } = useProgress(); 
  
  const mediaProgress = useGameStore((state) => state.mediaProgress);
  const mediaLoaded = useGameStore((state) => state.mediaLoaded);
  const mediaTotal = useGameStore((state) => state.mediaTotal);
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);

  const hasMedia = mediaTotal > 0;

  const finalProgress = hasMedia ? progress * 0.7 + mediaProgress * 0.3 : progress;
 
  return (
    <div className={s.loadingScreen}>
      {/* <Sparkles /> */}
      <Canvas
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
        </Canvas>
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
                <span> Chargement {Math.round(progress)}%</span>
              </div>
            </>
          ) : (
            <Button  onClick={() => setCurrentScreen("menu")}>
              Continuer
            </Button>
          )}
        </div> 

      <div className={s.headphones}>
        <img src="/assets/images/headphones.svg" alt="" />
        <p>Pour une meilleure expérience, nous vous recommandons d’utiliser un casque audio. </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
