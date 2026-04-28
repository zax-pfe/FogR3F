import { useGameStore } from "../../../../store/store";
import Button from "../../Design/Button/Button";
import Text from "../../Design/Text/Text";
import s from "./SelectedItems.module.scss";

const SelectedItems = ({ refBox, analyse }) => {

    const { selectedItems } = useGameStore();

    const coefPos = 0.15;

    return (
        <div className={s.selectedItems}>
            <Text variant="b1" className={s.selectedItems__title}>
                Éléments sélectionnés
            </Text>
            <div ref={refBox} className={s.selectedItems__box}>
                {/* Les éléments sélectionnés seront affichés ici */}
                {selectedItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            top: 'calc(50% + ' + (item.y * coefPos) + 'px)',
                            left: 'calc(50% + ' + (item.x * coefPos) + 'px)',
                            '--animation-delay': `${index * 0.2}s` 
                        }}
                        className={s.selectedItems__point}
                    >
                    </div>
                ))}
            </div>
            <Button onClick={analyse}>Analyzer</Button>
        </div>
    );
};

export default SelectedItems;