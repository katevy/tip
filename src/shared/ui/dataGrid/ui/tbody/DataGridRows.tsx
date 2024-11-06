import { useContext, useState } from "react";
import { DataGridContext } from "../../model/context";
import { CellCoords, DataGridItem } from "../../model/types";
import { DataGridBodyCell } from "./DataGridBodyCell";
import { trash } from "@assets/icons/svg";
import './data-grid-rows.scss'

interface DataGridRowsProps {
    items: DataGridItem[]
}

export const DataGridRows: React.FC<DataGridRowsProps> = ({ items }) => {

    const { itemsSource, setItems, columns, onChange } = useContext(DataGridContext)

    const deleteItem = (id: string | number) => {
        if (window.confirm("Вы уверены, что хотите удалить этот элемент?")) {
            setItems(itemsSource.filter(item => item.id !== id))
        }
    }

    const [draggedItem, setDraggedItem] = useState<{ id: string | number, index: number } | null>(null)

    const handleDragStart = (itemId: string | number, index: number) => {
        setDraggedItem({ id: itemId, index })
    }

    const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault()

        event.currentTarget.classList.add("drag-over")
    }

    const handleDragLeave = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.currentTarget.classList.remove("drag-over")
    }

    const handleDrop = (event: React.DragEvent<HTMLTableRowElement>, targetIndex: number) => {
        event.preventDefault()

        if (!draggedItem || draggedItem.index === targetIndex) return

        const updatedItems = [...itemsSource]
        const [movedItem] = updatedItems.splice(draggedItem.index, 1)

        const { clientY } = event
        const { top, height } = event.currentTarget.getBoundingClientRect()
        const insertIndex = clientY < top + height / 2 ? targetIndex : targetIndex + 1

        updatedItems.splice(insertIndex, 0, movedItem)

        setItems(updatedItems)
        setDraggedItem(null)

        if (onChange)
            onChange(updatedItems)

        event.currentTarget.classList.remove("drag-over")
    }


    return (
        <tbody>
            {
                items.map((item, rowIndex) => {

                    return (
                        <tr
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(item.id, rowIndex)}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, rowIndex)}
                        >
                            <td className="row-control left"></td >
                            {
                                columns.map((column, columnIndex) => {

                                    const { key } = column

                                    const value = item[key]
                                    const coords: CellCoords = {
                                        row: rowIndex,
                                        column: columnIndex
                                    }

                                    return <DataGridBodyCell
                                        value={value}
                                        coords={coords}
                                        key={key}
                                    />
                                })
                            }

                            <td className="row-control" >
                                <img
                                    src={trash}
                                    width="24"
                                    height="24"
                                    onClick={() => deleteItem(item.id)}
                                />
                            </td >
                        </tr>
                    )
                })
            }
        </tbody>
    );
};