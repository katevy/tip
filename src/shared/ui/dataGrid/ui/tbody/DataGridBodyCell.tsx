import React, { useCallback, useEffect, useState } from "react";
import { DataGridBodyCellProps, DataGridItemValue } from "../../model/types";
import { useDebounce } from "@src/shared/lib/useDebounce";
import { Input } from "@src/shared/ui/input";


export const DataGridBodyCell: React.FC<DataGridBodyCellProps> = React.memo((props) => {

    const {
        coords,
        editingCell,
        value = '',
        onClick,
        changeCommand = () => null,
    } = props

    const [thisValue, setThisValue] = useState(value)
    const [isEdit, setIsEdit] = useState(false)
    const isSelected = coords?.column === editingCell?.column && coords?.row === editingCell?.row

    useEffect(() => setThisValue(value), [value])

    useEffect(() => {
        if (!isSelected && isEdit) {
            setIsEdit(false)
        }
    }, [isSelected])

    const debounceChangeCommand = useDebounce(changeCommand, 400)

    const command = useCallback((val: DataGridItemValue) => {
        setThisValue(val)
        debounceChangeCommand(val)
    }, [])

    const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!isSelected && onClick) {
            onClick(e)
        } else if (!isEdit) {
            setIsEdit(prev => !prev)
        }
    }, [isEdit, isSelected])

    if (isEdit && isSelected && typeof thisValue !== 'boolean') {
        return <td title={thisValue.toString()} onClick={handleClick}>
            <Input onChange={command} value={thisValue} />
            {/* <ComponentByValueType onBlur={onBlurHandler} focused name={name} value={thisValue} command={command} type={valueType} /> */}
        </td>
    }
    else {
        return <td title={thisValue?.toString()} onClick={handleClick} >
            <span>{thisValue}</span>
        </td>
    }
});