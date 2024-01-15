import React from 'react';
import { Button, List, ListItem } from '../../ui-components';
import { FormProvider, useForm } from 'react-hook-form';
import { ProducTable, ProductList, SearchProduct } from '../../components';
import { IProductData } from '../../common/types';

export interface IFormValues {
    searchProduct: string;
}

export const FProducts: React.FC = (): React.JSX.Element => {
    const form = useForm<IFormValues>();
    const { handleSubmit, formState: { isValid } } = form;

    const handleOnSubmit = (values: IFormValues): void => {
        console.log("Form Submitted: ", values, isValid)
    }

    const handleSearchProduct = () => {
        handleSubmit(handleOnSubmit)()
    }

    const handleView = (productData: IProductData) => {
        console.log("view has been clicked ", productData)
    }

    const handleEdit = (productData: IProductData) => {
        console.log("edit has been clicked ", productData)
    }

    const handleDelete = (productData: IProductData) => {
        console.log("delete has been clicked ", productData)
    }

    const tableData: IProductData[] = [
        {
            img: 'https://webbox.imgix.net/images/owvecfmxulwbfvxm/c56a0c0d-8454-431a-9b3e-f420c72e82e3.jpg?auto=format,compress&fit=crop&crop=entropy',
            productId: 'P81B37AC',
            productName: 'Single Room',
            productType: 'Room',
            qty: 3,
            price: '$599',
            actions: {
                viewItem: handleView,
                editItem: handleEdit,
                deleteItem: handleDelete
            }
        },
        {
            img: 'https://webbox.imgix.net/images/owvecfmxulwbfvxm/7421591e-1ef6-4e85-b93c-94e5a105d39b.jpg?auto=format,compress&fit=crop&crop=entropy&w=1536',
            productId: 'P81B37AD',
            productName: 'Double Room',
            productType: 'Room',
            qty: 4,
            price: '$654',
            actions: {
                viewItem: handleView,
                editItem: handleEdit,
                deleteItem: handleDelete
            }
        },
        {
            img: 'https://webbox.imgix.net/images/owvecfmxulwbfvxm/a92f9ff0-237d-41ea-b48c-58a92f61995e.jpg?auto=format,compress&fit=crop&crop=entropy&w=1536',
            productId: 'P81B37AE',
            productName: 'Family Suite',
            productType: 'Room',
            qty: 5,
            price: '$693',
            actions: {
                viewItem: handleView,
                editItem: handleEdit,
                deleteItem: handleDelete
            }
        }
    ]

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <div className='md:mr-4 md:w-96'>
                    {/* TODO: Find a way to abstract FormProvider and form together and expose handleSubmit */}
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
                    <div className="relative overflow-x-auto shadow-md rounded-lg">
                        <ProducTable tableData={tableData}/>
                    </div>
                </div>
                <div className='mt-4 md:hidden'>
                    {/* The list */}
                    <div className=" bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <ProductList listData={tableData} />
                    </div>
                </div>
            </div>
        </>
    );
}