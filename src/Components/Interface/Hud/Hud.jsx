import { useState } from "react";
import Letterbox from "../Letterbox/Letterbox";
import s from "./Hud.module.scss";
import ToolsWheel from "../ToolsWheel/ToolsWheel";

const Hud = () => {

    const [showLetterbox, setShowLetterbox] = useState(false);

    return (
        <div className={s.hud}>
            {/* // sous-titre et roue d'outils */}
            <ToolsWheel />
            <Letterbox show={showLetterbox} />
        </div>
    );
};

export default Hud;