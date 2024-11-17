import { ProductTable } from "..";
import { IBasePaginatedResponse, IProduct } from "../../common/types";
import { Pagination } from "../../ui-components";

export interface IPaginatedTable {
    tableData: IProduct[]
    handlePagination: (page: number) => void
    currentPage: number
    data: IBasePaginatedResponse<IProduct[]>;
    itemsPerPage: number;
}

export const PaginatedTable: React.FC<IPaginatedTable> = ({ tableData, handlePagination, currentPage, data, itemsPerPage }): React.JSX.Element => {
    return (
        <>
            <ProductTable
                tableData={tableData}
            />
            <div className='mt-4'>
                <Pagination
                    totalRowCount={data.totalItems}
                    handlePages={handlePagination}
                    itemsPerPage={itemsPerPage}
                    totalPages={data.totalPages}
                    defaultPage={currentPage}
                />
            </div>
        </>
    );
}