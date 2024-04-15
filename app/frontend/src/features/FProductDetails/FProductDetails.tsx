import { useNavigate, useParams } from 'react-router-dom';
import { ActionButtons, DeleteModal, Header } from '../../components';
import { useDeleteProduct, useGetProduct } from '../../hooks';
import { LoadingSpinner } from '../../ui-components';
import { useCallback, useState } from 'react';
import { ApplicationRoutes } from '../../common/enums';
import { useDispatch } from 'react-redux';
import { setDeleteProduct } from '../../store/ProductSlice';
import { currencyConverter, toUppercaseFirstLetter } from '../../common/services';

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

    const [open, setOpen] = useState(false);
    const { deleteProductFn, error: deleteError, loading: deleteLoading } = useDeleteProduct();
    const { data, loading, error } = useGetProduct({ productId: productId || '' });
    const { getProduct } = data || {};
    const { productName, img, productType, qty, price, description } = getProduct || {};
    const { value } = price || {};

    console.log("aaa ", data)
    const handleEdit = useCallback(() => {
        navigate(`${ApplicationRoutes.EditProductDetail}/${productId}`);
    }, [navigate, productId]);

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
    };

    const handleBack = useCallback(() => {
        navigate(ApplicationRoutes.Products);
    }, [navigate]);

    if (loading || deleteLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Header headerTitle={productName ?? ''} />
            <div className="mt-10" />
            <div className="grid grid-cols-1 md:inline-grid md:grid-cols-2 gap-4 bg-indigo-100 rounded-lg">
                <div>
                    <img className='shadow border object-cover rounded-l-lg w-full h-full' src={img}></img>
                </div>
                <div className="flex flex-col gap-y-4 p-2">
                    <div>
                        <span className="block font-semibold ">Description</span>
                        {description}
                    </div>
                    <div>
                        <span className="block font-semibold ">Product type</span>
                        {toUppercaseFirstLetter(String(productType))}
                    </div>
                    <div>
                        <span className="block font-semibold ">Quantity</span>
                        {qty}
                    </div>
                    <div>
                        <span className="block font-semibold ">Price</span>
                        {price && `${currencyConverter(price.currencyCode)}${value}`}
                    </div>
                </div>
            </div>
            <div className="mt-10" />
            <ActionButtons
                actionButtons={[
                    {
                        variant: 'secondary',
                        name: 'productDetailEdit',
                        label: 'Edit',
                        onClick: handleEdit
                    },
                    {
                        variant: 'secondary',
                        name: 'productDetailDelete',
                        label: 'Delete',
                        onClick: () => setOpen(true)
                    },
                    {
                        variant: 'primary',
                        name: 'productDetailBack',
                        label: 'Back',
                        onClick: handleBack
                    }
                ]}
            />
            <DeleteModal open={open} setOpen={setOpen} onDelete={handleOnDelete} />
        </>
    );
};
