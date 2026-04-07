import { useState } from "react";
import Letterbox from "../Letterbox/Letterbox";
import s from "./Hud.module.scss";
import ToolsWheel from "../ToolsWheel/ToolsWheel";
import PopupClue from "../PopupClue/PopupClue";

const Hud = () => {

    const [showLetterbox, setShowLetterbox] = useState(false);
    const [currentClue, setCurrentClue] = useState(true);

    return (
        <div className={s.hud}>
            {currentClue && <PopupClue closePopup={() => setCurrentClue(false)} />}
            {/* // sous-titre et roue d'outils */}
            <ToolsWheel />
            <Letterbox show={showLetterbox} />
        </div>
    );
};

export default Hud;