import Button from "../../Design/Button/Button";
import Text from "../../Design/Text/Text";
import s from "./SelectedItems.module.scss";

const SelectedItems = ({ refBox, selectedItems }) => {

    return (
        <div className={s.selectedItems}>
            <Text variant="b1" className={s.selectedItems__title}>
                Éléments sélectionnés
            </Text>
            <div ref={refBox} className={s.selectedItems__box}>
                {/* Les éléments sélectionnés seront affichés ici */}
                {selectedItems.map((item, index) => (
                    <div key={index} style={{top: 20, left: 50}} className={s.selectedItems__point}>
                    </div>
                ))}
            </div>
            <Button>Analyser</Button>
        </div>
    );
};

export default SelectedItems;