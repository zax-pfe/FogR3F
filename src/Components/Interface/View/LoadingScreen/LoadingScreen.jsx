import s from "./LoadingScreen.module.scss";
import { useEffect, useRef } from "react";
import { useGameStore } from "../../../../store/store";
import { useProgress } from "@react-three/drei";

const LoadingScreen = ({ onFinished }) => {

    const { active, progress, loaded, total, item, errors } = useProgress();
    const { mediaProgress, mediaLoaded, mediaTotal, mediaItem} = useGameStore();

    const hasMedia = mediaTotal > 0;

    const finalProgress = hasMedia ? progress * 0.7 + mediaProgress * 0.3 : progress;

    return (
        <div className={s.loadingScreen}>
            {/* <video
        className={s.loadingVideo}
        src="/videos/loading.mp4"
        autoPlay
        muted
        loop
        playsInline
      /> */}

            <div className={s.loadingContent}>
                <h1>Nature Éloquente</h1>
                <p>Chargement de l’expérience...</p>

                <div className={s.progressWrapper}>
                    <div
                        className={s.progressBar}
                         style={{ width: `${finalProgress}%` }}
                    />
                </div>

                <span>{Math.round(progress)}%</span>
                <small>3D : {loaded} / {total}</small>

                {hasMedia && (
                <small>
                    Médias : {mediaLoaded} / {mediaTotal}
                </small>
                )}
            </div>
        </div>
    );
};

export default LoadingScreen;