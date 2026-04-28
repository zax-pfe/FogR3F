import s from "./Button.module.scss";

const Button = ({ variant = 'm', onClick, className, children }) => {

    return (
        <button className={`${s.button} ${s[variant]} ${className}`} onClick={onClick}>
            <div className={s.content}>
                {children}
            </div>
        </button>
    );
};

export default Button;