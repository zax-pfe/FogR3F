import CloseBtn from "../Design/CloseBtn/CloseBtn";
import CustomText from "../Design/Text/Text";
import s from "./Popup.module.scss";

const Popup = ({ image, title, closePopup, isClue, children, className, classNameBg }) => {

    return (
        <>
            <div className={`${s.background} ${classNameBg}`} onClick={closePopup}></div>
            <div className={`${s.popup} ${className}`}>
                {isClue && (
                    <div className={s.popup__note}>
                        <CustomText variant="h3" className={s.popup__noteTitle}>Indice récolté</CustomText>
                    </div>
                )}
                <div className={s.popup__container}>
                    <CloseBtn onClick={closePopup} className={s.popup__closeBtn} />
                    {image && <img className={s.popup__image} src={image} alt="" />}
                    <div className={s.popup__titleWrapper}>
                        <div className={`${s.popup__titleWrapper__decoration} ${s.left}`}></div>
                        <CustomText variant="h3" className={s.popup__title}>{title}</CustomText>
                        <div className={`${s.popup__titleWrapper__decoration} ${s.right}`}></div>
                    </div>
                    <div className={s.popup__clue}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;