import { useContext, useEffect, useRef, useState } from "react";
import DataGridHeadCell from "./DataGridHeadCell";
import { DataGridContext } from "../../model/context";
import { useResize } from "@src/shared/lib/resizer";
import { useDebounce } from "@src/shared/lib/useDebounce";
import "./thead.scss"

export const HeaderRow = () => {

    const { columns } = useContext(DataGridContext)

    const [headerHeight, setHeaderHeight] = useState<number>(40)

    const row = useRef<HTMLTableDataCellElement>(null)

    useEffect(() => {
        const savedHeaderHeight = localStorage.getItem("dataGridHeaderHeight")
        if (savedHeaderHeight) {
            setHeaderHeight(Number(savedHeaderHeight))
        }
    }, [])

    const changeHeight = (size: number) => {
        if (size !== headerHeight) {
            localStorage.setItem("dataGridHeaderHeight", size.toString())
            setHeaderHeight(size)
        }
    }

    const debounceSetHeight = useDebounce(changeHeight, 300)

    useResize(row, true, ['bottom'], (size) => debounceSetHeight(size))

    return (
        <thead>
            <tr style={{ height: headerHeight }}>
                <td ref={row} className="row-control left" />
                {
                    columns.map((column) => {
                        return (<DataGridHeadCell key={column.key} value={column} />)
                    })
                }
                <td className="row-control" />
            </tr>
        </thead>
    );
};