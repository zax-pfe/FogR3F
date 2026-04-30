import s from "./Button.module.scss";

const Button = ({ variant = 'm', active, hovered, onClick, className, disabled, children }) => {

    return (
        <button className={`${s.button} ${s[variant]} ${active ? s.active : ''} ${hovered ? s.hovered : ''} ${className}`} onClick={onClick} disabled={disabled}>
            <div className={s.content}>
                {children}
            </div>
        </button>
    );
};

export default Button;