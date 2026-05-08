import s from "./Hud.module.scss";
import { useState } from "react";
import Letterbox from "../Letterbox/Letterbox";
import ToolsWheel from "../ToolsWheel/ToolsWheel";
import Popup from "../Popup/Popup";
import TabObject from "../TabObject/TabObject";
import { c_AudioUI } from "../../../constant/audio";
import Text from "../Design/Text/Text";
import { useGameStore } from "../../../store/store";

const Hud = () => {

  const [showLetterbox, setShowLetterbox] = useState(false);
  const [viewObject, setViewObject] = useState(false);

  const currentDialogue = useGameStore((state) => state.currentDialogue);

  const handleClosePopup = () => {
    setViewObject(false);
    c_AudioUI.play('close');
  }

  return !currentDialogue && (
    <div className={s.hud}>
      {viewObject &&
        <Popup image={viewObject.image} title={viewObject.title} closePopup={handleClosePopup} isClue>
          {viewObject.text && <Text>{viewObject.text}</Text>}
        </Popup>}
      {/* // sous-titre et roue d'outils */}
      <TabObject viewObject={viewObject} setViewObject={setViewObject} />
      <ToolsWheel />
      <Letterbox show={showLetterbox} />
    </div>
  );
};

export default Hud;