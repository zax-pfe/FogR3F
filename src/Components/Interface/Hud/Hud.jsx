import { useState } from "react";
import Letterbox from "../Letterbox/Letterbox";
import s from "./Hud.module.scss";
import ToolsWheel from "../ToolsWheel/ToolsWheel";
import { c_Objects } from "../../../constant/objects";
import PopupObject from "../PopupObject/PopupObject";

const Hud = () => {

    const [showLetterbox, setShowLetterbox] = useState(false);
    const [currentObject, setCurrentObject] = useState(false);

    return (
        <div className={s.hud}>
            {currentObject && <PopupObject image={currentObject.image} title={currentObject.title} text={currentObject.text} closePopup={() => setCurrentObject(false)} />}
            {/* // sous-titre et roue d'outils */}
            <ToolsWheel />
            <Letterbox show={showLetterbox} />
        </div>
    );
};

export default Hud;