import s from "./CloseBtn.module.scss";

const CloseBtn = ({onClick, className}) => {

    return (
        <button className={`${s.closeBtn} ${className || ''}`} onClick={onClick} title="Fermer">
            <img className={s.closeBtn__icon} src="/assets/icons/MIL_Close.svg" alt="Fermer" />
            <span className='sr-only'>Fermer</span>
        </button>
    );
};

export default CloseBtn;