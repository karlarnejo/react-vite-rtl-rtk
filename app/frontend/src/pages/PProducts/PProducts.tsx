import { Header, Link } from "../../components";
import { FProducts } from "../../features";

export const PProducts: React.FC = (): React.JSX.Element => {
    const handleAddProduct = () => {
        console.log("add product")
    }

    return (
        <>
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