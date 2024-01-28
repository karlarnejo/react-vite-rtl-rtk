import { Header, Link } from "../../components";
import { FAddProduct } from "../../features";

export const PAddProduct: React.FC = (): React.JSX.Element => {
    return (
        <>
            <Link icon="M13 5H1m0 0 4 4M1 5l4-4" label="Back to Products" routeTo="/products" />
            <div className="mb-12"/>
            <Header 
                headerTitle="Add product"
            />
            <div className="mt-10"/>
            <FAddProduct/>
        </>
    );
}