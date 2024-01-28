import { useNavigate, useParams } from "react-router-dom";
import { ActionButtons, DeleteModal } from "../../components";
import { useDeleteProduct, useGetProduct } from "../../hooks";
import { LoadingSpinner } from "../../ui-components";
import { useCallback, useState } from "react";
import { ApplicationRoutes } from "../../common/enums";
import { useDispatch } from "react-redux";
import { setDeleteProduct } from "../../store/ProductSlice";
import { currencyConverter } from "../../common/services";

export interface IProductDetailsFormValues {
    productName: string;
    productType: string;
    productQty: number;
    productPrice: string;
    productDescription: string;
}

export const FProductDetails: React.FC = (): React.JSX.Element => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();

    const [open, setOpen] = useState(false)
    const { deleteProductFn, error: deleteError, loading: deleteLoading } = useDeleteProduct();
    const { data, loading, error } = useGetProduct({ productId: productId || '' });
    const { getProduct } = data || {};
    const { productName, productType, qty, price, description } = getProduct || {};
    const { currencyCode, value } = price || {};
    
    const handleEdit = useCallback(() => {
        navigate(`${ApplicationRoutes.EditProductDetail}/${productId}`);
    }, [navigate])

    const handleOnDelete = async (): Promise<void> => {
        await deleteProductFn({
            variables: { productId },
            onCompleted: (): void => {
                dispatch(setDeleteProduct({ status: 'SUCCESS', productId }));
            },
            onError: (): void => {
                dispatch(setDeleteProduct({ status: 'FAILED', productId }));
            }
        });
        setOpen(false);
        navigate(ApplicationRoutes.Products);
    }

    const handleBack = useCallback(() => {
        navigate(ApplicationRoutes.Products);
    }, [navigate])
    
    if(loading || deleteLoading) {
        return (<LoadingSpinner/>);
    }
    
    return (
        <>
            <div className="flex flex-col gap-y-4">
                <div>
                    <span className="block font-semibold ">
                        Product Id
                    </span>
                    {productId}
                </div>
                <div>
                    <span className="block font-semibold ">
                        Product name
                    </span>
                    {productName}
                </div>
                <div>
                    <span className="block font-semibold ">
                        Product type
                    </span>
                    {productType}
                </div>
                <div>
                    <span className="block font-semibold ">
                        Quantity
                    </span>
                    {qty}
                </div>
                <div>
                    <span className="block font-semibold ">
                        Price
                    </span>
                    {price && (
                        `${currencyConverter(price.currencyCode)}${value}`
                    )}
                </div>
                <div>
                    <span className="block font-semibold ">
                        Description
                    </span>
                    {description}
                </div>
            </div>
            <div className="mt-10"/>
            <ActionButtons
                actionButtons={[
                    { variant: 'secondary', name: 'productDetailEdit', label: 'Edit', onClick: handleEdit},
                    { variant: 'secondary', name: 'productDetailDelete', label: 'Delete', onClick: () => setOpen(true)},
                    { variant: 'primary', name: 'productDetailBack', label: 'Back', onClick: handleBack}
                ]}
            />
            <DeleteModal
                open={open}
                setOpen={setOpen}
                onDelete={handleOnDelete}
            />
        </>
    );
};