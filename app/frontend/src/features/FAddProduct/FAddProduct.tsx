import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IAddProductDetailsFormValues } from "../../common/types";
import { useCallback } from "react";
import { ApplicationRoutes } from "../../common/enums";
import { LoadingSpinner } from "../../ui-components";
import { useDispatch } from "react-redux";
import { ActionButtons, FormInputDescription, FormInputPrice, FormInputProductName, FormInputProductType, FormInputQty } from "../../components";
import { IAddProductResponse, useAddProduct } from "../../hooks";
import { setAddProduct } from "../../store/ProductSlice";

export const FAddProduct: React.FC = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { addProductFn, data, loading, error } = useAddProduct();

    const form = useForm<IAddProductDetailsFormValues>({
        defaultValues: {
            img: 'mockImgLaterWithFileChooser',
            productName: '',
            productType: '',
            qty: '',
            price: '',
            description: ''
        }
    });
    const { handleSubmit, formState: { isValid } } = form;

    const handleOnSubmit = async (values: IAddProductDetailsFormValues): Promise<void> => {
        if(isValid) {
            await addProductFn({
                variables: {
                    product: {
                        ...values,
                        qty: Number(values.qty),
                        price: { currencyCode: 'PHP', value: Number(values.price) }
                    }
                },
                onCompleted: (response: IAddProductResponse): void => {
                    dispatch(setAddProduct({ status: 'SUCCESS', productId: response.addProduct.productId }));
                },
                onError: (): void => {
                    dispatch(setAddProduct({ status: 'FAILED' }));
                }
            });
            navigate(ApplicationRoutes.Products);
        }
    }

    const handleSubmitAdd = () => {
        handleSubmit(handleOnSubmit)()
    }

    const handleBack = useCallback(() => {
        navigate(ApplicationRoutes.Products);
    }, [navigate])
    
    if(loading) {
        return (<LoadingSpinner/>);
    }
    
    return (
        <>
            <div className="flex flex-col">
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="md:w-96">
                            <div className="mt-4"/>
                            <FormInputProductName/>
                            <div className="mt-4"/>
                            <FormInputProductType/>
                            <div className="mt-4"/>
                            <FormInputQty/>
                            <div className="mt-4"/>
                            <FormInputPrice/>
                            <div className="mt-4"/>
                            <FormInputDescription/>
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="mt-10"/>
            <ActionButtons
                actionButtons={[
                    { variant: 'secondary', name: 'productDetailSubmit', label: 'Submit', onClick: handleSubmitAdd},
                    { variant: 'primary', name: 'productDetailBack', label: 'Back', onClick: handleBack}
                ]}
            />
        </>
    );
};