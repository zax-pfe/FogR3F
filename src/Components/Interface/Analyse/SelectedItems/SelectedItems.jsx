import { AnimatePresence, motion } from "motion/react";
import { c_AudioUI } from "../../../../constant/audio";
import { useGameStore } from "../../../../store/store";
import Button from "../../Design/Button/Button";
import CustomText from "../../Design/Text/Text";
import s from "./SelectedItems.module.scss";

const SelectedItems = ({ refBox, analyse }) => {
  // const { selectedItems, maxSelectedItems, hotspotCurrent, setHotspotCurrent } = useGameStore();
  const selectedItems = useGameStore((state) => state.selectedItems);
  const maxSelectedItems = useGameStore((state) => state.maxSelectedItems);
  const hotspotCurrent = useGameStore((state) => state.hotspotCurrent);
  const setHotspotCurrent = useGameStore((state) => state.setHotspotCurrent);

  const coefPos = 0.15;

  return (
    <div className={s.selectedItems}>
      <div
        ref={refBox}
        className={`${s.selectedItems__box} ${selectedItems.length >= maxSelectedItems ? s.highlight : ""}`}
      >
        <AnimatePresence>
          {/* Les éléments sélectionnés seront affichés ici */}
          {selectedItems.map((item, index) => (
            <motion.div
              key={index}
              style={{
                top: "calc(50% + " + item.y * coefPos + "px)",
                left: "calc(50% + " + item.x * coefPos + "px)",
                "--animation-delay": `${index * 0.2}s`,
              }}
              className={`${s.selectedItems__point} ${hotspotCurrent === item ? s.active : ""}`}
              onClick={() => {
                setHotspotCurrent(item);
                c_AudioUI.play("open");
              }}
              onMouseEnter={() => c_AudioUI.play("hover")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className={s.selectedItems__boxDecoration}></div>
      <CustomText variant="b1" className={s.selectedItems__title}>
        Éléments sélectionnés
      </CustomText>
      <Button
        onClick={analyse}
        hovered={selectedItems.length >= maxSelectedItems}
        disabled={selectedItems.length < 1}
        variant="s"
      >
        Analyser
      </Button>
    </div>
  );
};

export default SelectedItems;
