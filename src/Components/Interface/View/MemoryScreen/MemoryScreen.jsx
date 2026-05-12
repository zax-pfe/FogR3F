import { useEffect, useRef, useState } from "react";
import s from "./MemoryScreen.module.scss";
import { useGameStore } from "../../../../store/store";
import Credits from "../Credits/Credits";

const MemoryScreen = () => {
  const r_Video = useRef();

  const [videoEnded, setVideoEnded] = useState(false);

  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);

  const handleVideoEnd = () => {
    // rediriger vers l'écran de fin ou faire une action spécifique
    // console.log("Vidéo terminée");
    setVideoEnded(true);
  };

  useEffect(() => {
    r_Video.current.play();
  }, []);

  return (
    <div className={s.memoryScreen}>
      <video className={s.memoryScreen__video} ref={r_Video} onEnded={handleVideoEnd}>
        <source src="/assets/video/Cinematique.mp4" type="video/mp4" />
      </video>
      {videoEnded && (
       
       <Credits/>
      )}
    </div>
  );
};

export default MemoryScreen;
