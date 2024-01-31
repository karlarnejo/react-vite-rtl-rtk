import { FormProvider, useForm } from 'react-hook-form';
import {
    ActionButtons,
    FormInputDescription,
    FormInputPrice,
    FormInputProductName,
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
    const { productId } = useParams();

    const { data, loading, error } = useGetProduct({ productId: productId || '' });
    const { editProductFn, data: editData, loading: editLoading, error: editError } = useEditProduct();

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
        if (isValid) {
            await editProductFn({
                variables: {
                    productId,
                    product: {
                        ...values,
                        qty: Number(values.qty),
                        price: { currencyCode: 'PHP', value: Number(values.price) }
                    }
                },
                onCompleted: (): void => {
                    dispatch(setEditProduct({ status: 'SUCCESS', productId }));
                },
                onError: (): void => {
                    dispatch(setEditProduct({ status: 'FAILED', productId }));
                }
            });
            navigate(`${ApplicationRoutes.ProductDetail}/${productId}`);
        }
    };

    const handleSubmitEdit = () => {
        handleSubmit(handleOnSubmit)();
    };

    const handleBack = useCallback(() => {
        navigate(`${ApplicationRoutes.ProductDetail}/${productId}`);
    }, [navigate, productId]);

    useEffect(() => {
        if (data && data.getProduct) {

            const { getProduct } = data || {};
            const { img, productName, productType, qty, price, description } = getProduct || {};
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

    if (loading || editLoading) {
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
                            <FormInputProductName />
                            <div className="mt-4" />
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
