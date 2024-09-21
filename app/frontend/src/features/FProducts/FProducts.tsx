import React, { useCallback, useState } from 'react';
import { Button, LoadingSpinner, Notification, Pagination } from '../../ui-components';
import { FormProvider, useForm } from 'react-hook-form';
import { ProductTable, ProductList, SearchProduct, DeleteModal, PaginatedTable } from '../../components';
import { IProduct } from '../../common/types';
import { useDeleteProduct, useGetAllProducts } from '../../hooks';
import { handleActionMapper } from './FProducts.service';
import { useDispatch } from 'react-redux';
import { setDeleteProduct } from '../../store/ProductSlice';
import { Params, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApplicationRoutes } from '../../common/enums';

export interface IProductsFormValues {
    searchProduct: string;
}

export const FProducts: React.FC = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //GET SEARCH QUERY FROM LINK. IF NULL, PASS BLANK

    const location = useLocation();
    const query: URLSearchParams = new URLSearchParams(location.search);

    const currentPage = query.get('currentPage');
    const itemsPerPage = query.get('itemsPerPage')
    const searchQuery = query.get('searchQuery')

    const [open, setOpen] = useState(false);
    const [idSelected, setIdSelected] = useState<string>('');
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [itemsPerPage, setItemsPerPage] = useState<number>(2);

    const form = useForm<IProductsFormValues>();
    const {
        handleSubmit,
        formState: { isValid }
    } = form;

    const { fetchMore, data, error, loading } = useGetAllProducts('', Number(currentPage), Number(itemsPerPage));
    const { deleteProductFn, error: deleteError, loading: deleteLoading } = useDeleteProduct();

    const handleOnSubmit = (values: IProductsFormValues): void => {
        console.log('Form Submitted: ', values, isValid);
        if (isValid) {
            const { searchProduct } = values;
            console.log("aaa ", searchProduct, !searchProduct ? 1 : currentPage)

            fetchMore({
                variables: {
                    currentPage: !searchProduct ? 1 : currentPage,
                    // currentPage: 5,
                    itemsPerPage: itemsPerPage,
                    searchQuery: searchProduct ?? ''
                },
                updateQuery: (_prev, { fetchMoreResult }) => fetchMoreResult
            });
        }
    };

    const handlePagination = (page: number) => {
        // setCurrentPage(page);
        fetchMore({
            variables: {
                currentPage,
                itemsPerPage: itemsPerPage,
                // searchQuery: 'Toughjoyfax'
            },
            updateQuery: (_prev, { fetchMoreResult }) => fetchMoreResult
        });
    }

    const handleSearchProduct = () => {
        handleSubmit(handleOnSubmit)();
    };

    const handleView = useCallback(
        (productData: IProduct) => {
            navigate(`${ApplicationRoutes.ProductDetail}/${productData.productId}`);
        },
        [navigate]
    );

    const handleEdit = useCallback(
        (productData: IProduct) => {
            navigate(`${ApplicationRoutes.EditProductDetail}/${productData.productId}`);
        },
        [navigate]
    );

    const handleDelete = (productData: IProduct) => {
        setOpen(true);
        setIdSelected(productData.productId);
    };

    const onDelete = async (): Promise<void> => {
        await deleteProductFn({
            variables: { productId: idSelected },
            onCompleted: (): void => {
                dispatch(setDeleteProduct({ status: 'SUCCESS', productId: idSelected }));
            },
            onError: (): void => {
                dispatch(setDeleteProduct({ status: 'FAILED', productId: idSelected }));
            }
        });
        setOpen(false);
    };

    // TODO: Find out why the entire page reloads if returning Loading spinner
    // if (loading || deleteLoading) {
    //     return <LoadingSpinner />;
    // }

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <div className="md:mr-4 md:w-96">
                    {/* TODO: Find a way to abstract FormProvider and form together and expose the useForm from it */}
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                            <SearchProduct />
                        </form>
                    </FormProvider>
                </div>
                <div className="flex flex-col mt-4 md:mt-8 md:flex-none">
                    <Button
                        name="searchProduct"
                        label="Search Product"
                        onClick={handleSearchProduct}
                        variant="primary"
                        roundedEdges='all'
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="hidden md:block md:mt-4 md:w-full">
                    {/* The table */}
                    {error ? (
                        <Notification
                            variant="danger"
                            message="There is an error fetching the products. Please contact the administrator and try again later."
                            closeable
                        />
                    ) : (
                        <PaginatedTable
                            tableData={handleActionMapper(data.getAllProducts.data, {
                                viewItem: handleView,
                                editItem: handleEdit,
                                deleteItem: handleDelete
                            })}
                            handlePagination={handlePagination}
                            currentPage={Number(currentPage)}
                            itemsPerPage={Number(itemsPerPage)}
                            data={data}
                        />
                    )}
                </div>
                <div className="mt-4 md:hidden">
                    {/* The list */}
                    <div className=" bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {error ? (
                            <Notification
                                variant="danger"
                                message="There is an error fetching the products. Please contact the administrator and try again later."
                                closeable
                            />
                        ) : (
                            <ProductList
                                listData={handleActionMapper(data.getAllProducts.data, {
                                    viewItem: handleView
                                })}
                            />
                        )}
                    </div>
                </div>
            </div>
            <DeleteModal open={open} setOpen={setOpen} onDelete={onDelete} />
        </>
    );
};
