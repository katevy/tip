import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import cn from "classnames";
import { Loader, LoaderSize } from "../loader";
import styles from "./button.module.scss";

export type ButtonProps = PropsWithChildren<{
    loading?: boolean;
}> &
    ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = (props) => {

    const { loading, className, children, disabled, type, ...other } = props

    return (
        <button
            className={cn(className, styles.button, "button", {
                [styles.button_disabled]: loading || disabled,
                [styles.button_load]: loading,
                [styles.submit]: type === 'submit'
            })}
            disabled={disabled || loading}
            {...other}
        >
            {loading && (
                <Loader className={styles.loader} size={LoaderSize.small} />
            )}
            {children}
        </button>
    );
};