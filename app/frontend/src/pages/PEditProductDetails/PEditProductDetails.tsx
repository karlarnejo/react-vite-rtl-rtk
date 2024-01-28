import { Header, Link } from "../../components";
import { FEditProductDetails } from "../../features";

export const PEditProductDetails: React.FC = (): React.JSX.Element => {

    return (
        <>
            <Link icon="M13 5H1m0 0 4 4M1 5l4-4" label="Back to Products" routeTo="/products" />
            <div className="mb-12"/>
            <Header 
                headerTitle="Product detail"
            />
            <div className="mt-10"/>
            <FEditProductDetails/>
        </>
    );
};