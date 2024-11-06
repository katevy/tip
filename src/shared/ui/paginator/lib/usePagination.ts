import { useEffect, useState } from "react"

export const usePagination = <T>(items: T[], limits: number[]) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(limits[0])

    const pagesCount = Math.ceil(items.length / currentLimit)

    const pageItems = items.slice(currentLimit * (currentPage - 1), currentLimit * currentPage)

    useEffect(() => {
        currentPage > pagesCount && setCurrentPage(pagesCount)
    }, [currentPage, pagesCount])

    return {
        pageItems,
        paginatorProps: {
            limitProps: {
                itemsCount: items.length,
                limits,
                currentLimit,
                setCurrentLimit
            },
            pagesProps: {
                pagesCount,
                currentPage,
                setCurrentPage,
            }
        }
    }
}