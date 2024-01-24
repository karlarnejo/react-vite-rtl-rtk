import { useSelector } from "react-redux";
import { Header, Link } from "../../components";
import { FProducts } from "../../features";
import { Notification } from "../../ui-components";
import { IProductSlice, getProductSlice } from "../../store/ProductSlice";
import { ProductNotifications } from "../../common/enums";
import React from 'react'

export const PProducts: React.FC = (): React.JSX.Element => {
    const { deleteProduct: { status: deleteStatus, productId } }  = useSelector(getProductSlice) as IProductSlice;

    const handleAddProduct = () => {
        console.log("add product")
    }

    return (
        <>
            {deleteStatus === 'SUCCESS' && (
                <>
                    <Notification
                        // Math.random to fix Notification not showing again after closing.
                        // Forces React to render the Notification because key is different from first render and so on.
                        // Math.random() is O(1). Shouldn't have any problems. Fix if better solution is found.
                        key={Math.random()}
                        variant='success'
                        message={`${ProductNotifications.success} ${productId}`}
                        closeable
                    />
                    <div className="mb-4"/>
                </>
            )}
            {deleteStatus === 'FAILED' && (
                <>
                    <Notification
                        key={Math.random()}
                        variant='danger'
                        message={`${ProductNotifications.error} ${productId} ${ProductNotifications.tryAgain}`}
                        closeable
                    />
                    <div className="mb-4"/>
                </>
            )}
            <Link icon="M13 5H1m0 0 4 4M1 5l4-4" label="Back to home" routeTo="/" />
            <div className="mb-12"/>
            <Header 
                headerTitle="Products"
                buttonProps={{
                    name: 'addProduct', onClick: handleAddProduct, variant: 'primary', label: 'Add Product'
                }}
            />
            <div className="mt-4"/>
            <FProducts/>
        </>
    );
}