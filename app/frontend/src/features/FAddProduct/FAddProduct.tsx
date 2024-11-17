import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IAddProductDetailsFormValues } from '../../common/types';
import { useCallback } from 'react';
import { ApplicationRoutes } from '../../common/enums';
import { LoadingSpinner } from '../../ui-components';
import { useDispatch } from 'react-redux';
import {
    ActionButtons,
    FormInputDescription,
    FormInputPrice,
    FormInputProductName,
    FormInputProductType,
    FormInputQty
} from '../../components';
import { useAddProduct } from '../../hooks';
import { setAddProduct } from '../../store/ProductSlice';
import { ProductType } from "../../common/enums";

export const FAddProduct: React.FC = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { addProductFn, data, isLoading, error } = useAddProduct();

    const form = useForm<IAddProductDetailsFormValues>({
        defaultValues: {
            img: '',
            productName: '',
            productType: '',
            qty: '',
            price: '',
            description: ''
        }
    });
    const {
        handleSubmit,
        formState: { isValid }
    } = form;

    const handleOnSubmit = async (values: IAddProductDetailsFormValues): Promise<void> => {
        if (isValid) {
            try {
                const response = await addProductFn({
                    img: values.img,
                    productName: values.productName,
                    productType: ProductType[values.productType as keyof typeof ProductType],
                    qty: Number(values.qty),
                    price: { currencyCode: 'PHP', value: Number(values.price) },
                    description: values.description,
                });

                if (response) {
                    dispatch(
                        setAddProduct({
                            status: 'SUCCESS',
                            productId: response.productId
                        })
                    );

                    navigate(ApplicationRoutes.Products);
                }
            } catch (error) {
                dispatch(setAddProduct({ status: 'FAILED' }));
                console.error('Error adding product:', error);
            }
        }
    };

    const handleSubmitAdd = () => {
        handleSubmit(handleOnSubmit)();
    };

    const handleBack = useCallback(() => {
        navigate(ApplicationRoutes.Products);
    }, [navigate]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className="flex flex-col">
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="md:w-96">
                            <div className="mt-4" />
                            <FormInputProductName />
                            <div className="mt-4" />
                            {/* TODO: Figure out best practice for file upload in apollo. Maybe try to have the file upload in another step. */}
                            {/* <FormInputProductImg />
                            <div className="mt-4" /> */}
                            <FormInputProductType />
                            <div className="mt-4" />
                            <FormInputQty />
                            <div className="mt-4" />
                            <FormInputPrice />
                            <div className="mt-4" />
                            <FormInputDescription />
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="mt-10" />
            <ActionButtons
                actionButtons={[
                    {
                        variant: 'secondary',
                        name: 'productDetailSubmit',
                        label: 'Submit',
                        onClick: handleSubmitAdd
                    },
                    {
                        variant: 'primary',
                        name: 'productDetailBack',
                        label: 'Back',
                        onClick: handleBack
                    }
                ]}
            />
        </>
    );
};
