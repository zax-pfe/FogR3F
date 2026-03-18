import { useState } from "react";
import Letterbox from "../Letterbox/Letterbox";
import s from "./Hud.module.scss";

const Hud = () => {

    const [showLetterbox, setShowLetterbox] = useState(true);

    return (
        <div className={s.hud}>
            {/* // sous-titre et roue d'outils */}
            <Letterbox show={showLetterbox} />
        </div>
    );
};

export default Hud;