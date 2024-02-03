import { useSelector } from 'react-redux';
import { Header, Link } from '../../components';
import { FProductDetails } from '../../features';
import { IProductSlice, getProductSlice } from '../../store/ProductSlice';
import { Notification } from '../../ui-components';
import { ProductNotifications } from '../../common/enums';

export const PProductDetails: React.FC = (): React.JSX.Element => {
    const {
        editProduct: { status: editStatus, productId }
    } = useSelector(getProductSlice) as IProductSlice;

    return (
        <>
            {editStatus === 'SUCCESS' && (
                <>
                    <Notification
                        variant="success"
                        message={`${ProductNotifications.successEdit} ${productId}`}
                        closeable
                    />
                    <div className="mb-4" />
                </>
            )}
            {editStatus === 'FAILED' && (
                <>
                    <Notification
                        variant="danger"
                        message={`${ProductNotifications.errorEdit} ${productId} ${ProductNotifications.tryAgain}`}
                        closeable
                    />
                    <div className="mb-4" />
                </>
            )}
            <Link icon="M13 5H1m0 0 4 4M1 5l4-4" label="Back to Products" routeTo="/products" />
            <div className="mb-12" />
            <Header headerTitle="Product detail" />
            <div className="mt-10" />
            <FProductDetails />
        </>
    );
};
