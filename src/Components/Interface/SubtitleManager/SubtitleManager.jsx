import { useEffect, useRef, useState } from "react";
import s from "./SubtitleManager.module.scss";
import { c_Dialogue } from "../../../constant/audio";
import { convertSRT } from "../../../utils/convertSRT";
import { useGameStore } from "../../../store/store";
import Text from "../Design/Text/Text";
import Subtitle from "../Design/Subtitle/Subtitle";

const SubtitleManager = () => {

    const { currentAudio, setCurrentAudio } = useGameStore();
    const [subtitles, setSubtitles] = useState([]);
    const subtitleLoaded = useRef(0);

    const handleDebugKeyDown = (e) => {
        if (e.key === "s") {
            console.log("Debug: Setting current audio to forest ambience");
            setCurrentAudio(c_Dialogue[0].index);
        }
    };

    useEffect(() => {
        const loadAllSubtitles = async () => {
            const sub = await Promise.all(
                c_Dialogue.map(async (dialogue) => {
                    const captions = await convertSRT(dialogue.srcSubtitle);
                    console.log(`Subtitles for ${dialogue.index} loaded:`, captions);
                    return {
                        index: dialogue.index,
                        srcSubtitle: dialogue.srcSubtitle,
                        caption: captions  // ✅ Maintenant c'est les vraies données
                    };
                })
            );
            setSubtitles(sub);
        };

        loadAllSubtitles();
    }, []);

    useEffect(() => {
        console.log("Subtitles in SubtitleManager: ", subtitles);
    }, [subtitles]);

    useEffect(() => {
        document.addEventListener("keydown", handleDebugKeyDown);
        return () => {
            document.removeEventListener("keydown", handleDebugKeyDown);
        };
    }, []);

    return currentAudio && (
        <div className={s.subtitleContainer}>
            {subtitles.map((subtitleArray) => (
                subtitleArray.index === currentAudio && (
                    subtitleArray.caption.map((subtitle, index) => (
                        <Subtitle
                            key={index}
                            text={subtitle.text}
                            start={subtitle.start}
                            duration={subtitle.duration}
                            latest={subtitle.latest}
                        />
                    ))
                )
            ))}
        </div>
    );
};

export default SubtitleManager;