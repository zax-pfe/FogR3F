import s from "./Button.module.scss";

const Button = ({ variant = 'm', active, onClick, className, disabled, children }) => {

    return (
        <button className={`${s.button} ${s[variant]} ${active ? s.active : ''} ${className}`} onClick={onClick} disabled={disabled}>
            <div className={s.content}>
                {children}
            </div>
        </button>
    );
};

export default Button;