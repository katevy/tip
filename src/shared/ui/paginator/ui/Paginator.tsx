import { LimitSelectorProps, PagesControlProps } from "../model/types";
import { LimitSelector } from "./LimitSelector";
import { PagesControl } from "./PagesControl";
import './paginator.scss'

export interface PaginatorProps {
    limitControlProps: LimitSelectorProps
    pagesControlProps: PagesControlProps
}

export const Paginator: React.FC<PaginatorProps> = (props) => {

    const {
        limitControlProps,
        pagesControlProps
    } = props

    return (
        <div className="paginator">

            <LimitSelector {...limitControlProps} />

            <PagesControl {...pagesControlProps} />

        </div>
    );
};