import gql from "graphql-tag";

export const addProduct = gql`
    mutation addProduct($product: ProductInput) {
        addProduct(product: $product) {
            status
            productId
        }
    }
`;