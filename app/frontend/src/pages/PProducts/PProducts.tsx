import { useSelector } from 'react-redux';
import { Header, Link } from '../../components';
import { FProducts } from '../../features';
import { Notification } from '../../ui-components';
import { IProductSlice, getProductSlice } from '../../store/ProductSlice';
import { ApplicationRoutes, ProductNotifications } from '../../common/enums';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../common/types';

export const PProducts: React.FC = (): React.JSX.Element => {
    const navigate = useNavigate();

    const {
        deleteProduct: { status: deleteStatus, productId },
        addProduct: { status: addStatus, productId: addProductId }
    } = useSelector(getProductSlice) as IProductSlice;

    const handleAddProduct = useCallback(
        (productData: IProduct) => {
            navigate(ApplicationRoutes.AddProduct);
        },
        [navigate]
    );

    return (
        <>
            {addStatus === 'SUCCESS' && (
                <>
                    <Notification
                        // Math.random to fix Notification not showing again after closing.
                        // Forces React to render the Notification because key is different from first render and so on.
                        // Math.random() is O(1). Shouldn't have any problems. Fix if better solution is found.
                        key={Math.random()}
                        variant="success"
                        message={`${ProductNotifications.successAdd} ${addProductId}.`}
                        closeable
                    />
                    <div className="mb-4" />
                </>
            )}
            {addStatus === 'FAILED' && (
                <>
                    <Notification
                        key={Math.random()}
                        variant="danger"
                        message={`${ProductNotifications.errorAdd} ${ProductNotifications.tryAgain}.`}
                        closeable
                    />
                    <div className="mb-4" />
                </>
            )}
            {deleteStatus === 'SUCCESS' && (
                <>
                    <Notification
                        // Math.random to fix Notification not showing again after closing.
                        // Forces React to render the Notification because key is different from first render and so on.
                        // Math.random() is O(1). Shouldn't have any problems. Fix if better solution is found.
                        key={Math.random()}
                        variant="success"
                        message={`${ProductNotifications.successDelete} ${productId}.`}
                        closeable
                    />
                    <div className="mb-4" />
                </>
            )}
            {deleteStatus === 'FAILED' && (
                <>
                    <Notification
                        key={Math.random()}
                        variant="danger"
                        message={`${ProductNotifications.errorDelete} ${productId} ${ProductNotifications.tryAgain}.`}
                        closeable
                    />
                    <div className="mb-4" />
                </>
            )}
            <Link icon="M13 5H1m0 0 4 4M1 5l4-4" label="Back to home" routeTo="/" />
            <div className="mb-12" />
            <Header
                headerTitle="Products"
                buttonProps={{
                    name: 'addProduct',
                    onClick: handleAddProduct,
                    variant: 'primary',
                    label: 'Add Product'
                }}
            />
            <div className="mt-10" />
            <FProducts />
        </>
    );
};
