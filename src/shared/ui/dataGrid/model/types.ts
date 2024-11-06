export type CellCoords = {
    row: number | null,
    column: number | null
} | null | undefined

export type DataGridItemValue = number | string | boolean

export interface DataGridColumn {
    key: string
    name: string
    width?: number
    regex?: RegExp
}

export interface DataGridItem {
    id: number | string
    [x: string]: DataGridItemValue
}

export interface DataGridProps {
    /** Массив объектов с данными для строк */
    items: DataGridItem[]

    /** Массив объектов с параметрами для столбцов */
    columns: DataGridColumn[]

    /** Метод, вызывающийся при изменении данных таблицы */
    onChange?: (items: DataGridItem[]) => void

    height?: number
}

export type SelectedCell = {
    row: DataGridItem
    column: DataGridColumn
    cellData: DataGridItemValue
}
// | null | undefined

export interface DataGridBodyCellProps {
    value?: DataGridItemValue
    coords: CellCoords
    editingCell?: SelectedCell
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
    changeCommand?: (val: DataGridItemValue) => void
}