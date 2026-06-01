import { useEffect, useState } from "react";
import s from "./CustomCursor.module.scss";
import { useGameStore } from "../../../../store/store";

const CustomCursor = () => {

    const { cursorPosition, setCursorPosition, smthgIsHovered, currentScreen } = useGameStore();

    const moveCursor = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return currentScreen !== "analyse" && (
        <div style={{ left: cursorPosition.x, top: cursorPosition.y }} className={`${s.customCursor} ${smthgIsHovered ? s.hoverSmthg : ''} ${smthgIsHovered === 'interactable' ? s.hoverSmthgInteractable : ''}`}></div>
    );
};

export default CustomCursor;