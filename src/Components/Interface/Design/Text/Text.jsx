import s from "./Text.module.scss";

const Text = ({ children, className, variant = "b0", inline = false }) => {

    return variant == "h1" ? (
        <h1 className={`${s[variant]} ${className}`}>
            {children}
        </h1>
    ) : variant == "h2" ? (
        <h2 className={`${s[variant]} ${className}`}>
            {children}
        </h2>
    ) : variant == "h3" ? (
        <h3 className={`${s[variant]} ${className}`}>
            {children}
        </h3>
    ) : variant == "h4" ? (
        <h4 className={`${s[variant]} ${className}`}>
            {children}
        </h4>
    ) : variant == "h5" ? (
        <h5 className={`${s[variant]} ${className}`}>
            {children}
        </h5>
    ) : inline ? (
        <span className={`${s[variant]} ${className}`}>
            {children}
        </span>
    ) : (
        <p className={`${s[variant]} ${className}`}>
            {children}
        </p>
    );
};

export default Text;