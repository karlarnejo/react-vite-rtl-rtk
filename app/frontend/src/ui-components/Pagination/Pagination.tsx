import React, { useMemo, useCallback, MouseEvent } from "react";
import { Button } from "..";

interface IPaginationProps {
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    handleNext: () => void;
    handlePrev: () => void;
    handlePages: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Pagination: React.FC<IPaginationProps> = React.memo(({
    itemsPerPage = 10,
    totalPages,
    currentPage,
    handleNext,
    handlePrev,
    handlePages,
}): JSX.Element => {
    // Calculate if previous and next buttons should be disabled
    const disablePrev: boolean = currentPage <= 1 || totalPages === 0;
    const disableNext: boolean = currentPage >= totalPages || totalPages === 0;

    // Memoize the pages array to avoid unnecessary recalculations
    const handleCreatePages: (number | string)[] = useMemo(() => {
        const adjacentPages: number = 2; // Number of pages to show on each side of the current page
        const pages: (number | string)[] = [];

        // Calculate start and end page numbers based on the current page and adjacent pages
        let startPage: number = Math.max(1, currentPage - adjacentPages);
        let endPage: number = Math.min(totalPages, currentPage + adjacentPages);

        // Add ellipsis or first page if necessary
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        // Add pages before the current page
        for (let i = startPage; i < currentPage; i++) {
            pages.push(i);
        }

        // Add current page
        pages.push(currentPage);

        // Add pages after the current page
        for (let i = currentPage + 1; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis or last page if necessary
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    }, [currentPage, totalPages]);

    // Memoize event handler for clicking on pages
    const handleClickPages = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        handlePages(event);
    }, [handlePages]);

    // Render the Pagination component
    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white"> 1 </span>
                to
                <span className="font-semibold text-gray-900 dark:text-white"> 10 </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white"> 100 </span>
                Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <ul className="inline-flex -space-x-px gap-x-2">
                    {/* Previous Button */}
                    <Button
                        name="prev"
                        label=""
                        variant="primary"
                        onClick={handlePrev}
                        roundedEdges="left"
                        disabled={disablePrev}
                        icon={
                            <svg
                                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 5H1m0 0 4 4M1 5l4-4"
                                />
                            </svg>
                        }
                    />
                    {/* Pages */}
                    {handleCreatePages.map((page, index) => (
                        <li key={index}>
                            {page === '...' ? (
                                <span>{page}</span>
                            ) : (
                                <Button
                                    name={page.toString()}
                                    label={page.toString()}
                                    value={page}
                                    selected={currentPage === page}
                                    variant="secondary"
                                    onClick={handleClickPages}
                                />
                            )}
                        </li>
                    ))}
                    {/* Next Button */}
                    <Button
                        name="next"
                        label="Next"
                        variant="primary"
                        onClick={handleNext}
                        roundedEdges="right"
                        disabled={disableNext}
                        iconPosition="right"
                        icon={
                            <svg
                                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        }
                    />
                </ul>
            </div>
        </div>
    );
});
