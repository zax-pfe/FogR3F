import { useGameStore } from "../../../../store/store";
import s from "./CloseBtn.module.scss";

const CloseBtn = ({ onClick, className }) => {

    const { setSmthgIsHovered } = useGameStore();

    const handleEnter = () => {
        setSmthgIsHovered(true);
    };

    const handleLeave = () => {
        setSmthgIsHovered(false);
    };

    return (
        <button className={`${s.closeBtn} ${className || ''}`} onClick={onClick} title="Fermer" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <img className={s.closeBtn__icon} src="/assets/icons/MIL_Close.svg" alt="Fermer" />
            <span className='sr-only'>Fermer</span>
        </button>
    );
};

export default CloseBtn;