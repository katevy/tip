export interface PagesControlProps {
    pagesCount: number
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export interface LimitSelectorProps {
    itemsCount: number
    limits: number[]
    currentLimit: number
    setCurrentLimit: React.Dispatch<React.SetStateAction<number>>
}