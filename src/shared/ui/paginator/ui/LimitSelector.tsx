import { Button } from "../../button";
import { LimitSelectorProps } from "../model/types";


export const LimitSelector: React.FC<LimitSelectorProps> = (props) => {

    const {
        itemsCount,
        limits,
        currentLimit,
        setCurrentLimit
    } = props

    const isCurrent = (calc: number) => {
        return currentLimit === calc ? 'current' : ''
    }

    return (
        <div>
            <div className='paginator__limit-selector'>
                {
                    limits.map(limit => (
                        <Button
                            key={limit}
                            className={isCurrent(limit)}
                            onClick={() => setCurrentLimit(limit)}
                        >{limit}</Button>
                    ))
                }
                <Button
                    className={isCurrent(itemsCount)}
                    onClick={() => setCurrentLimit(itemsCount)}
                >All</Button>
            </div>
        </div>
    );
};