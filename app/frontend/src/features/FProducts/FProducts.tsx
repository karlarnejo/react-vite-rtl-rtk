import React from 'react';
import { Button, LoadingSpinner, Notification } from '../../ui-components';
import { FormProvider, useForm } from 'react-hook-form';
import { ProductTable, ProductList, SearchProduct, ActionButtons } from '../../components';
import { IProduct } from '../../common/types';
import { useGetAllProducts } from '../../hooks';
import { handleActionMapper } from './FProducts.service';

export interface IFormValues {
    searchProduct: string;
}

export const FProducts: React.FC = (): React.JSX.Element => {
    const form = useForm<IFormValues>();
    const { handleSubmit, formState: { isValid } } = form;

    const { data, error, loading } = useGetAllProducts();

    const handleOnSubmit = (values: IFormValues): void => {
        console.log("Form Submitted: ", values, isValid)
    }

    const handleSearchProduct = () => {
        handleSubmit(handleOnSubmit)()
    }

    const handleView = (productData: IProduct) => {
        console.log("view has been clicked ", productData)
    }

    const handleEdit = (productData: IProduct) => {
        console.log("edit has been clicked ", productData)
    }

    const handleDelete = (productData: IProduct) => {
        console.log("delete has been clicked ", productData)
    }

    if(loading) {
        return (<LoadingSpinner/>);
    }

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <div className='md:mr-4 md:w-96'>
                    {/* TODO: Find a way to abstract FormProvider and form together and expose the useForm from it */}
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                            <SearchProduct />
                        </form>
                    </FormProvider>
                </div>
                <div className="flex flex-col mt-4 md:mt-8 md:flex-none">
                    <Button
                        name='searchProduct'
                        label='Search Product'
                        onClick={handleSearchProduct}
                        variant='primary'
                    />
                </div>
            </div>
            <div className='flex flex-col md:flex-row'>
                <div className="hidden md:block md:mt-4 md:w-full">
                    {/* The table */}
                    {error ? 
                        <Notification
                            variant='danger'
                            message='There is an error fetching the products. Please contact the administrator and try again later.'
                            closeable
                        /> : <ProductTable tableData={handleActionMapper(data.getAllProducts, { viewItem: handleView, editItem: handleEdit, deleteItem: handleDelete })}/>}
                </div>
                <div className='mt-4 md:hidden'>
                    {/* The list */}
                    <div className=" bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {error ?
                            <Notification
                                variant='danger'
                                message='There is an error fetching the products. Please contact the administrator and try again later.'
                                closeable
                            /> : <ProductList listData={handleActionMapper(data.getAllProducts, { viewItem: handleView })} />}
                    </div>
                </div>
            </div>
        </>
    );
}