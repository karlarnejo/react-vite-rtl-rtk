import React, { useCallback, MouseEvent } from "react";
import { Button } from "..";

interface IPaginationProps {
    itemsPerPage: number;
    totalPages: number;
    pageCount?: number;
    defaultPage?: number;
    totalRowCount?: number;
    handlePages: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
    itemsPerPage = 10,
    totalPages,
    pageCount = 7,
    totalRowCount,
    defaultPage = 1,
    handlePages,
}): JSX.Element => {
    const disablePrev: boolean = defaultPage === 1 || totalPages === 0;
    const disableNext: boolean = defaultPage === totalPages || totalPages === 0;

    const pageEnd: number = itemsPerPage * defaultPage;
    const pageStart: number = (pageEnd - itemsPerPage) + 1;

    const handleFirstPage: () => void = useCallback(() => {
        handlePages(1);
    }, [handlePages])

    const handleLastPage: () => void = useCallback(() => {
        handlePages(totalPages)
    }, [handlePages, totalPages])

    const handlePrev: () => void = useCallback(() => {
        handlePages(defaultPage - 1)
    }, [handlePages, defaultPage])

    const handleNext: () => void = useCallback(() => {
        handlePages(defaultPage + 1)
    }, [handlePages, defaultPage])

    const handleCreatePages = (): number[] => {
        const pages: number[] = [];

        // Return pages immediately
        if (totalPages <= pageCount) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        const halfDisplayCount: number = Math.floor(pageCount / 2);
        let startPage: number = Math.max(1, defaultPage - halfDisplayCount);
        let endPage: number = Math.min(totalPages, startPage + pageCount - 1);

        // Adjust startPage if there are not enough pages to display
        if (endPage - startPage < pageCount - 1) {
            startPage = Math.max(1, endPage - pageCount + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    }

    // Memoize event handler for clicking on pages
    const handleClickPages = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handlePages(parseInt(event.currentTarget.value))
    }, [handlePages]);

    const renderFirstNextButtons = (): JSX.Element => {
        return (
            <>
                <Button
                    name="first"
                    label=""
                    variant="primary"
                    onClick={handleFirstPage}
                    roundedEdges="all"
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m17 16-4-4 4-4m-6 8-4-4 4-4" />
                        </svg>
                    }
                />
                <Button
                    name="prev"
                    label=""
                    variant="primary"
                    onClick={handlePrev}
                    roundedEdges="all"
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m14 8-4 4 4 4" />
                        </svg>
                    }
                />
            </>
        )
    }

    const renderLastPrevButtons = (): JSX.Element => {
        return (
            <>
                <Button
                    name="next"
                    label=""
                    variant="primary"
                    onClick={handleNext}
                    roundedEdges="all"
                    disabled={disableNext}
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m10 16 4-4-4-4" />
                        </svg>
                    }
                />
                <Button
                    name="last"
                    label=""
                    variant="primary"
                    onClick={handleLastPage}
                    roundedEdges="all"
                    disabled={disableNext}
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                        </svg>
                    }
                />
            </>
        );
    }

    return (
        <div className="flex flex-col items-center">
            {totalRowCount && (
                <div className="flex justify-end">
                    <span className="text-sm text-gray-700">
                        Showing
                        <span className="font-semibold text-gray-900"> {pageStart} </span>
                        to
                        <span className="font-semibold text-gray-900"> {pageEnd} </span>
                        of
                        <span className="font-semibold text-gray-900"> {totalRowCount} </span>
                        Entries
                    </span>
                </div>
            )}
            <div className="inline-flex mt-2 xs:mt-0">
                <ul className="inline-flex -space-x-px gap-x-2">
                    {renderFirstNextButtons()}
                    {handleCreatePages().map((page) => (
                        <li key={page.toString()}>
                            <Button
                                name={page.toString()}
                                label={page.toString()}
                                value={page}
                                size="xs"
                                roundedEdges="all"
                                selected={defaultPage === page}
                                variant="secondary"
                                onClick={handleClickPages}
                            />
                        </li>
                    ))}
                    {renderLastPrevButtons()}
                </ul>
            </div>
        </div>
    );
};