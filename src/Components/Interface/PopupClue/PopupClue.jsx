import Text from "../Design/Text/Text";
import s from "./PopupClue.module.scss";

const PopupClue = ({closePopup}) => {

    return (
        <>
            <div className={s.background} onClick={closePopup}></div>
            <div className={s.popup}>
                <div className={s.popup__container}>
                    <Text variant="h2" className={s.popup__title}>Indice trouvé !</Text>
                </div>
            </div>
        </>
    );
};

export default PopupClue;