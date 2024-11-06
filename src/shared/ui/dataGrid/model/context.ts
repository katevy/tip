import { createContext } from "react"
import { DataGridColumn, DataGridItem } from "./types"

export interface IDataGridContext {
    itemsSource: DataGridItem[]
    setItems: (items: DataGridItem[]) => void
    columns: DataGridColumn[]
    setColumns: (cols: DataGridColumn[]) => void
    rowHeights: Record<number, number>
    setRowHeights: (heights: Record<number, number>) => void
    onChange?: (items: DataGridItem[]) => void
}

export const DataGridContext = createContext<IDataGridContext>({
    itemsSource: [],
    setItems: () => { },
    columns: [],
    setColumns: () => { },
    rowHeights: {},
    setRowHeights: () => { }
});
