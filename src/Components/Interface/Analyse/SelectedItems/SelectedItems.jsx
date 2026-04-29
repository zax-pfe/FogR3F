import { useGameStore } from "../../../../store/store";
import Button from "../../Design/Button/Button";
import Text from "../../Design/Text/Text";
import s from "./SelectedItems.module.scss";

const SelectedItems = ({ refBox, analyse }) => {

    const { selectedItems, maxSelectedItems, hotspotCurrent, setHotspotCurrent } = useGameStore();

    const coefPos = 0.15;

    return (
        <div className={s.selectedItems}>
            <Text variant="b1" className={s.selectedItems__title}>
                Éléments sélectionnés
            </Text>
            <div ref={refBox} className={`${s.selectedItems__box} ${selectedItems.length >= maxSelectedItems ? s.highlight : ''}`}>
                {/* Les éléments sélectionnés seront affichés ici */}
                {selectedItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            top: 'calc(50% + ' + (item.y * coefPos) + 'px)',
                            left: 'calc(50% + ' + (item.x * coefPos) + 'px)',
                            '--animation-delay': `${index * 0.2}s` 
                        }}
                        className={`${s.selectedItems__point} ${hotspotCurrent === item ? s.active : ''}`}
                        onClick={() => setHotspotCurrent(item)}
                    >
                    </div>
                ))}
            </div>
            <div className={s.selectedItems__boxDecoration}></div>
            <Button onClick={analyse} hovered={selectedItems.length >= maxSelectedItems} disabled={selectedItems.length < 1}>Analyzer</Button>
        </div>
    );
};

export default SelectedItems;