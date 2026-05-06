import { useEffect, useState } from "react";
import s from "./CustomCursor.module.scss";
import { useGameStore } from "../../../../store/store";

const CustomCursor = () => {

    const { smthgIsHovered, currentScreen } = useGameStore();

    // hover | interactable

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const moveCursor = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return currentScreen !== "analyse" && (
        <div style={{ left: position.x, top: position.y }} className={`${s.customCursor} ${smthgIsHovered ? s.hoverSmthg : ''} ${smthgIsHovered === 'interactable' ? s.hoverSmthgInteractable : ''}`}></div>
    );
};

export default CustomCursor;