import { c_AudioUI } from "../../../../constant/audio";
import { useGameStore } from "../../../../store/store";
import Button from "../../Design/Button/Button";
import Text from "../../Design/Text/Text";
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
      <Text variant="b1" className={s.selectedItems__title}>
        Éléments sélectionnés
      </Text>
      <div
        ref={refBox}
        className={`${s.selectedItems__box} ${selectedItems.length >= maxSelectedItems ? s.highlight : ""}`}
      >
        {/* Les éléments sélectionnés seront affichés ici */}
        {selectedItems.map((item, index) => (
          <div
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
          ></div>
        ))}
      </div>
      <div className={s.selectedItems__boxDecoration}></div>
      <Button
        onClick={analyse}
        hovered={selectedItems.length >= maxSelectedItems}
        disabled={selectedItems.length < 1}
      >
        Analyzer
      </Button>
    </div>
  );
};

export default SelectedItems;
