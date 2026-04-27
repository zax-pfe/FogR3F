import s from "./Button.module.scss";

const Button = ({ onClick, children }) => {

    return (
        <button className={s.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;