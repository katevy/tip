import { InputHTMLAttributes, FC } from "react";

import cn from "classnames";

import styles from "./input.module.scss";

export type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> & {
    value: string | number
    onChange: (value: string) => void
}

export const Input: FC<InputProps> = (props) => {

    const { className, value, onChange, disabled, ...other } = props

    return (
        <input
            className={cn(className, styles.input, "input", {
                [styles.input_disabled]: disabled,
            })}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={"text"}
            {...other}
        />
    );
};
