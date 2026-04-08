import CloseBtn from "../Design/CloseBtn/CloseBtn";
import Text from "../Design/Text/Text";
import s from "./PopupClue.module.scss";

const PopupClue = ({ image, title, text, closePopup }) => {

    return (
        <>
            <div className={s.background} onClick={closePopup}></div>
            <div className={s.popup}>
                <div className={s.popup__note}>
                    <Text variant="h3" className={s.popup__noteTitle}>Indice récolté</Text>
                </div>
                <div className={s.popup__container}>
                    <CloseBtn onClick={closePopup} className={s.popup__closeBtn} />
                    {image && <img className={s.popup__image} src={image} alt="" />}
                    <div className={s.popup__titleWrapper}>
                        <div className={`${s.popup__titleWrapper__decoration} ${s.left}`}></div>
                        <Text variant="h3" className={s.popup__title}>{title}</Text>
                        <div className={`${s.popup__titleWrapper__decoration} ${s.right}`}></div>
                    </div>
                    {text && (
                        <Text className={s.popup__clue}>
                            {text}
                        </Text>
                    )}
                </div>
            </div>
        </>
    );
};

export default PopupClue;