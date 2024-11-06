import { FC, PropsWithChildren } from "react";
import styles from './with-loader.module.scss'
import { Loader, LoaderSize } from "../loader";

export type WithLoaderProps = PropsWithChildren<{
    isLoading: boolean
}>

export const WithLoader: FC<WithLoaderProps> = ({ isLoading, children }) => (
    <div className={styles.root}>
        {isLoading && <Loader className={styles.loader} size={LoaderSize.larg} />}
        {children}
    </div>
);
