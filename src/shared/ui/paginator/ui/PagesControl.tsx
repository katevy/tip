import { ChevronLeft, ChevronsLeft } from "@assets/icons/svg";
import { Button } from "../../button";
import { PagesControlProps } from "../model/types";


export const PagesControl: React.FC<PagesControlProps> = (props) => {

    const {
        pagesCount,
        currentPage,
        setCurrentPage
    } = props

    const moreThan4 = pagesCount > 4
    const calculatePage = currentPage > pagesCount - 3 && moreThan4 ? pagesCount - 3 : 1

    const handlePageChange = (page: number) => setCurrentPage(Math.min(Math.max(page, 1), pagesCount))

    return (
        <div className="paginator__page-controls">
            <Button
                disabled={currentPage < 1}
                onClick={() => handlePageChange(1)}
            >
                <ChevronsLeft />
            </Button>

            <Button
                disabled={currentPage < 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <ChevronLeft />
            </Button>

            {/* {moreThan4 && currentPage >= pagesCount - 3 && (
                <Input placeholder="..." />
            )} */}

            {Array.from({ length: Math.min(3, pagesCount) }, (_, i) => {
                const page = calculatePage + i;
                return (
                    <Button
                        key={page}
                        className={currentPage === page ? "current" : ""}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </Button>
                )
            })}

            {/* {moreThan4 && currentPage < pagesCount - 3 && (
                <Input placeholder="..." />
            )} */}

            {pagesCount > 3 && (
                <Button
                    className={currentPage === pagesCount ? "current" : ""}
                    onClick={() => handlePageChange(pagesCount)}
                >
                    {pagesCount}
                </Button>
            )}

            <Button
                disabled={currentPage > pagesCount}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <ChevronLeft style={{ transform: "rotate(180deg)" }} />
            </Button>

        </div>
    );
};