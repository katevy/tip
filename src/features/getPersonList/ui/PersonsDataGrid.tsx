import { personListStore } from '@entities/person';
import { RequestStatus } from '@src/shared/api';
import { Person } from '@src/shared/api/Person/models';
import { DataGrid } from '@src/shared/ui/dataGrid';
import { DataGridColumn, DataGridItem } from '@src/shared/ui/dataGrid/model/types';
import { WithLoader } from '@src/shared/ui/withLoader';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';

import styles from './persons-data-grid.module.scss'

const columns: DataGridColumn[] = [
    { key: 'name', name: 'Name' },
    { key: 'height', name: 'Height' },
    { key: 'mass', name: 'Mass' },
    { key: 'hair_color', name: 'Hair color' },
    { key: 'gender', name: 'Gender' },
]

export const PersonsDataGrid = observer(() => {

    const [_wh, setWindowHeight] = useState(window.innerHeight)

    useEffect(() => {
        const resizeListener = () => {
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener('resize', resizeListener)

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    const { persons, requestStatus, updatePersons } = personListStore

    const isLoading = requestStatus === RequestStatus.LOADING
    const isError = requestStatus === RequestStatus.ERROR
    const isEmpty = !persons.length

    const handleDataGridChange = useCallback((items: DataGridItem[]) => {
        updatePersons(items.map(item => ({
            id: Number(item.id),
            name: item.name || '',
            height: item.height || '',
            mass: item.mass || '',
            hair_color: item.hair_color || '',
            gender: item.gender || '',
            isNew: item.isNew || false
        } as Person)))
    }, [])

    return (
        <WithLoader isLoading={isLoading}>
            {
                isError ? (
                    <div className={styles.message_error}>
                        Ошибка загрузки данных
                    </div>
                ) : (
                    isEmpty ? (
                        <div className={styles.message}>
                            Данные не загружены
                        </div>
                    ) : (
                        <DataGrid
                            columns={columns}
                            items={persons.map(item => ({ ...item } as DataGridItem))}
                            onChange={handleDataGridChange}
                            height={_wh - 200}
                        />
                    )
                )
            }
        </WithLoader>
    );
});