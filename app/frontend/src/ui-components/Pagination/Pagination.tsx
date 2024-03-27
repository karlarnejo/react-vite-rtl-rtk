import React, { useMemo, useCallback, MouseEvent } from "react";
import { Button } from "..";

interface IPaginationProps {
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    siblings?: number;
    handleNext: () => void;
    handlePrev: () => void;
    handlePages: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Pagination: React.FC<IPaginationProps> = React.memo(({
    itemsPerPage = 10,
    totalPages,
    currentPage,
    siblings = 2,
    handleNext,
    handlePrev,
    handlePages,
}): JSX.Element => {
    // Calculate if previous and next buttons should be disabled
    const disablePrev: boolean = currentPage <= 1 || totalPages === 0;
    const disableNext: boolean = currentPage >= totalPages || totalPages === 0;

    // Memoize the pages array to avoid unnecessary recalculations
    const handleCreatePages: (number | string)[] = useMemo(() => {
        const pages: (number | string)[] = [];

        pages.push(1);

        if (totalPages <= 7) {
            for (let i = 2; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            // first page
            if (currentPage < 4 + siblings) {
                for (let i = 2; i <= 4 + siblings; i++) {
                    pages.push(i);
                }
                pages.push('...');
                // last page
            } else if (totalPages - currentPage < 4) {
                pages.push('...');
                for (let i = totalPages - 6 + siblings; i < totalPages; i++) {
                    pages.push(i);
                }
                // middle page
            } else {
                pages.push('...');
                for (let i = Math.max(2, currentPage - siblings); i <= Math.min(totalPages - 1, currentPage + siblings); i++) {
                    pages.push(i);
                }
                pages.push('...');

            }
        }

        pages.push(totalPages);

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
                                className="w-6 h-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m14 8-4 4 4 4" />
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
                        label=""
                        variant="primary"
                        onClick={handleNext}
                        roundedEdges="right"
                        disabled={disableNext}
                        iconPosition="right"
                        icon={
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m10 16 4-4-4-4" />
                            </svg>
                        }

                    />
                </ul>
            </div>
        </div>
    );
});