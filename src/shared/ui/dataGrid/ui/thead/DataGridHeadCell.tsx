import { TriangleDown } from "@assets/icons/svg";
import { DataGridColumn } from "../../model/types";
import { memo, useCallback, useContext, useRef, useState } from "react";
import { useResize } from "@src/shared/lib/resizer";
import { DataGridContext } from "../../model/context";


interface DataGridHeadCellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
    value: DataGridColumn
}

const DataGridHeadCell = ({ value, ...props }: DataGridHeadCellProps) => {

    const { itemsSource, setItems, setColumns, columns, onChange } = useContext(DataGridContext)

    const [sortType, setSortType] = useState(false)
    const [rotate, setRotate] = useState(false)

    const cell = useRef<HTMLTableCellElement>(null)

    const {
        name = '',
        key,
        width,
    } = value

    const sortByColumn = useCallback(() => {
        const sortedItems = [...itemsSource].sort((a, b) => {
            const valueA = a[key]
            const valueB = b[key]

            const numA = Number(valueA)
            const numB = Number(valueB)

            const isANumber = !isNaN(numA)
            const isBNumber = !isNaN(numB)

            if (isANumber && isBNumber) {
                return sortType ? numA - numB : numB - numA;
            } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortType ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
            }
            return 0
        })

        setItems(sortedItems)
        setSortType(prev => !prev)
        if (onChange)
            onChange(sortedItems)
    }, [itemsSource, key, sortType])

    const setColumnWidth = useCallback((size: number) => {
        const newColumns = [...columns].map(col => {
            if (col.key === key) {
                return { ...col, width: size }
            }
            return col
        })
        setColumns(newColumns)
    }, [columns, key])

    const handleClick = () => {
        setRotate(!rotate)
        sortByColumn()
    }

    const svgProps = {
        className: `sort-arrow ${rotate ? 'rotate' : ''} `,
        onClick: handleClick
    }

    useResize(cell, true, ['right'], setColumnWidth)

    return (
        <th {...props} ref={cell} className="head-cell" style={{ width: width }}>
            <div className="head-cell-content">
                <span title={name}>{name}</span>
                <TriangleDown {...svgProps} />
            </div>
        </th>
    );
};

export default memo(DataGridHeadCell, (prevProps, nextProps) => {
    return (
        prevProps.value === nextProps.value &&
        prevProps.className === nextProps.className &&
        prevProps.style?.width === nextProps.style?.width
    );
});
