import { DataGridColumn, DataGridItem, type DataGridProps } from "../model/types";
import { HeaderRow } from "./thead/HeaderRow";
import { DataGridContext, IDataGridContext } from "../model/context";
import { CSSProperties, useEffect, useState } from "react";
import { DataGridRows } from "./tbody/DataGridRows";
import "./data-grid.scss"
import { Paginator, usePagination } from "../../paginator";


export const DataGrid = ({ ...props }: DataGridProps) => {

    const {
        items,
        columns,
        onChange,
        height
    } = props

    const [itemsSource, setItemsSource] = useState<DataGridItem[]>(items)
    const [dataColumns, setDataColumns] = useState<DataGridColumn[]>([])
    const [rowHeights, setRowHeights] = useState<Record<number, number>>({})

    useEffect(() => {
        setItemsSource(items)
    }, [items])

    useEffect(() => {
        if (dataColumns.length === 0) {
            const savedColumns = localStorage.getItem("dataGridColumns")
            if (savedColumns) {
                setDataColumns(JSON.parse(savedColumns))
            } else {
                const initialColumns = columns.map(col => ({
                    ...col,
                    width: col.width || 120
                }))
                setDataColumns(initialColumns)
            }
        }
    }, [columns, dataColumns.length])

    useEffect(() => {
        const savedRowHeights = localStorage.getItem("dataGridRowHeights");
        if (savedRowHeights) {
            setRowHeights(JSON.parse(savedRowHeights))
        }
    }, [])


    const context: IDataGridContext = {
        itemsSource: itemsSource,
        setItems: setItemsSource,
        columns: dataColumns,
        setColumns: (newColumns) => {
            setDataColumns(newColumns)
            localStorage.setItem("dataGridColumns", JSON.stringify(newColumns))
        },
        rowHeights: rowHeights,
        setRowHeights: (heights) => {
            localStorage.setItem("dataGridRowHeights", JSON.stringify(heights))
            setRowHeights(heights)
        },
        onChange: onChange
    }

    useEffect(() => {
        if (onChange) {
            onChange(itemsSource)
        }
    }, [itemsSource.length])

    const {
        pageItems,
        paginatorProps
    } = usePagination(itemsSource, [15])

    const gridStyles: CSSProperties = {
        height
    }

    return (
        <DataGridContext.Provider value={context}>
            <div className="data-grid" style={gridStyles}>
                <table>
                    <HeaderRow />
                    <DataGridRows items={pageItems} />
                </table>
            </div>
            <Paginator limitControlProps={paginatorProps.limitProps} pagesControlProps={paginatorProps.pagesProps} />
        </DataGridContext.Provider>
    );
};

