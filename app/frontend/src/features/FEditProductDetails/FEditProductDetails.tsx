import { FormProvider, useForm } from 'react-hook-form';
import {
    ActionButtons,
    FormInputDescription,
    FormInputPrice,
    FormInputProductType,
    FormInputQty
} from '../../components';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationRoutes } from '../../common/enums';
import { useEditProduct, useGetProduct } from '../../hooks';
import { LoadingSpinner } from '../../ui-components';
import { IEditProductDetailsFormValues } from '../../common/types';
import { useDispatch } from 'react-redux';
import { setEditProduct } from '../../store/ProductSlice';

export const FEditProductDetails: React.FC = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();

    const { data, isLoading, error } = useGetProduct({ productId: productId || '' });
    const { editProductFn, data: editData, isLoading: editLoading, error: editError } = useEditProduct();

    const form = useForm<IEditProductDetailsFormValues>({
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
        reset,
        formState: { isValid }
    } = form;

    const handleOnSubmit = async (values: IEditProductDetailsFormValues): Promise<void> => {
        if (!productId) {
            console.error('Show error notification that productId is empty');
            return;
        }

        if (isValid) {
            try {
                await editProductFn({
                    productId,
                    product: {
                        ...values,
                        qty: Number(values.qty),
                        price: { currencyCode: 'PHP', value: Number(values.price) }
                    }
                });

                dispatch(setEditProduct({ status: 'SUCCESS', productId }));
                navigate(`${ApplicationRoutes.ProductDetail}/${productId}`);
            } catch (error) {
                dispatch(setEditProduct({ status: 'FAILED', productId }));
                console.error('Error editing product:', error);
            }
        }
    };

    const handleSubmitEdit = () => {
        handleSubmit(handleOnSubmit)();
    };

    const handleBack = useCallback(() => {
        navigate(`${ApplicationRoutes.ProductDetail}/${productId}`);
    }, [navigate, productId]);

    // TODO: Transfer to a custom hook
    useEffect(() => {
        if (data) {

            const { img, productName, productType, qty, price, description } = data || {};
            const { value } = price || {};

            reset({
                img,
                productName,
                productType,
                qty: String(qty),
                price: String(value),
                description
            });
        }
    }, [data, reset]);

    if (isLoading || editLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className="flex flex-col">
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="md:w-96">
                            <div>
                                <span className="block font-semibold ">Product Id</span>
                                {productId}
                            </div>
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
                        onClick: handleSubmitEdit
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
