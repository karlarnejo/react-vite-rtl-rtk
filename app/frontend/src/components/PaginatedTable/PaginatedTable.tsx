import { ProductTable } from "..";
import { IProduct } from "../../common/types";
import { IGetAllProductsResponse } from "../../hooks";
import { Pagination } from "../../ui-components";

export interface IPaginatedTable {
    tableData: IProduct[]
    handlePagination: (page: number) => void
    currentPage: number
    data: IGetAllProductsResponse;
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
                    totalRowCount={data.getAllProducts.totalItems}
                    handlePages={handlePagination}
                    itemsPerPage={itemsPerPage}
                    totalPages={data.getAllProducts.totalPages}
                    defaultPage={currentPage}
                />
            </div>
        </>
    );
}