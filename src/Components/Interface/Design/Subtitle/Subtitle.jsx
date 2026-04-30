import { useGSAP } from "@gsap/react";
import Text from "../Text/Text";
import s from "./Subtitle.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGameStore } from "../../../../store/store";

const Subtitle = ({ text, start, duration, latest }) => {

    const { setCurrentAudio } = useGameStore();

    const multiLine = text.split("\r\n");
    const r_Subtitle = useRef();

    useGSAP(() => {
        let tl = gsap.timeline();

        tl.from(r_Subtitle.current, {
            opacity: 0,
            delay: start,
            duration: 0.3
        })
        tl.to(r_Subtitle.current, {
            opacity: 0,
            delay: duration - 0.5,
            duration: 0.3,
            onComplete: () => {
                if (latest) {
                    console.log("Last subtitle finished, resetting current audio.");
                    setCurrentAudio(null); // Reset current audio to hide subtitles
                }
            }
        });
    });

    return (
        <div ref={r_Subtitle} className={s.subtitle}>
            {
                multiLine.map((line, index) => (
                    <Text variant="c1" key={index} className={s.subtitle__line}>
                        {line}
                    </Text>
                ))
            }
        </div>
    );
}

export default Subtitle;