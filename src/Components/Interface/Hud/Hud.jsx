import { useState } from "react";
import Letterbox from "../Letterbox/Letterbox";
import s from "./Hud.module.scss";
import ToolsWheel from "../ToolsWheel/ToolsWheel";
import PopupClue from "../PopupClue/PopupClue";

const Hud = () => {

    const [showLetterbox, setShowLetterbox] = useState(false);
    const [currentClue, setCurrentClue] = useState({
        // image: "/assets/icons/MIL_Close.svg",
        title: "Indice manquant",
        // text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a est ac nisi rhoncus maximus. Donec sollicitudin lacus sit amet nulla aliquam, in vehicula justo eleifend. Praesent vel cursus ipsum, a rhoncus ante. In et orci quis felis facilisis ultrices mollis eu leo. "
    });

    return (
        <div className={s.hud}>
            {currentClue && <PopupClue image={currentClue.image} title={currentClue.title} text={currentClue.text} closePopup={() => setCurrentClue(false)} />}
            {/* // sous-titre et roue d'outils */}
            <ToolsWheel />
            <Letterbox show={showLetterbox} />
        </div>
    );
};

export default Hud;