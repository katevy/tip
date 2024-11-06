import { FC } from "react";

import cn from "classnames";

import styles from "./loader.module.scss";

export enum LoaderSize {
    small = "small",
    medium = "medium",
    larg = "larg",
}

export type LoaderProps = {
    size?: LoaderSize
    className?: string
}

export const Loader: FC<LoaderProps> = (props) => {

    const { size = LoaderSize.medium, className } = props

    return (
        <div className={className}>
            <div
                className={cn(styles.loader, {
                    [styles.small]: size === LoaderSize.small,
                    [styles.medium]: size === LoaderSize.medium,
                    [styles.large]: size === LoaderSize.larg,
                })}
            />
        </div>
    );
};
