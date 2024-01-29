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
                        // Math.random to fix Notification not showing again after closing.
                        // Forces React to render the Notification because key is different from first render and so on.
                        // Math.random() is O(1). Shouldn't have any problems. Fix if better solution is found.
                        key={Math.random()}
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
                        key={Math.random()}
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
