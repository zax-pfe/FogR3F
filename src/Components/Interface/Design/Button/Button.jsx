import { useGameStore } from "../../../../store/store";
import s from "./Button.module.scss";

const Button = ({ variant = "m", active, hovered, onClick, className, disabled, children }) => {

  const { setSmthgIsHovered } = useGameStore();

  const handleEnter = () => {
    if (!disabled) {
      setSmthgIsHovered(true);
    }
  };

  const handleLeave = () => {
    setSmthgIsHovered(false);
  };

  return (
    <button
      className={`${s.button} ${s[variant]} ${active ? s.active : ""} ${hovered ? s.hovered : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={s.content}>{children}</div>
    </button>
  );
};

export default Button;
