import gql from "graphql-tag";

export const deleteProduct = gql`
    mutation deleteProduct($productId: String) {
        deleteProduct(productId: $productId) {
            status
            productId
        }
    }
`;