import s from "./Hud.module.scss";
import { useState } from "react";
import Letterbox from "../Letterbox/Letterbox";
import ToolsWheel from "../ToolsWheel/ToolsWheel";
import PopupObject from "../PopupObject/PopupObject";
import TabObject from "../TabObject/TabObject";
import Tronk from "../Tronk/Tronk";

const Hud = () => {

    const [showLetterbox, setShowLetterbox] = useState(false);
    const [viewObject, setViewObject] = useState(false);

    return (
        <div className={s.hud}>
            {viewObject && <PopupObject image={viewObject.image} title={viewObject.title} text={viewObject.text} closePopup={() => setViewObject(false)} />}
            {/* // sous-titre et roue d'outils */}
            <TabObject viewObject={viewObject} setViewObject={setViewObject} />
            <ToolsWheel />
            <Letterbox show={showLetterbox} />
            {/* <Tronk /> */}
        </div>
    );
};

export default Hud;