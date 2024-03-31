import React, { useCallback, useState } from 'react';
import { Button, LoadingSpinner, Notification, Pagination } from '../../ui-components';
import { FormProvider, useForm } from 'react-hook-form';
import { ProductTable, ProductList, SearchProduct, DeleteModal } from '../../components';
import { IProduct } from '../../common/types';
import { useDeleteProduct, useGetAllProducts } from '../../hooks';
import { handleActionMapper } from './FProducts.service';
import { useDispatch } from 'react-redux';
import { setDeleteProduct } from '../../store/ProductSlice';
import { useNavigate } from 'react-router-dom';
import { ApplicationRoutes } from '../../common/enums';

export interface IProductsFormValues {
    searchProduct: string;
}

export const FProducts: React.FC = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [idSelected, setIdSelected] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const form = useForm<IProductsFormValues>();
    const {
        handleSubmit,
        formState: { isValid }
    } = form;

    const { data, error, loading } = useGetAllProducts();
    const { deleteProductFn, error: deleteError, loading: deleteLoading } = useDeleteProduct();

    const handleOnSubmit = (values: IProductsFormValues): void => {
        console.log('Form Submitted: ', values, isValid);
    };

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

    if (loading || deleteLoading) {
        return <LoadingSpinner />;
    }

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
                        <>
                            <ProductTable
                                tableData={handleActionMapper(data.getAllProducts, {
                                    viewItem: handleView,
                                    editItem: handleEdit,
                                    deleteItem: handleDelete
                                })}
                            />
                            <div className='mt-4'>
                                <Pagination totalRowCount={200} handlePages={setCurrentPage} itemsPerPage={10} totalPages={20} defaultPage={currentPage} />
                            </div>
                        </>
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
                                listData={handleActionMapper(data.getAllProducts, {
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
