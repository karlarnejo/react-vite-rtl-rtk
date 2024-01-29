import gql from 'graphql-tag';

export const editProduct = gql`
    mutation Mutation($productId: String, $product: ProductInput) {
        editProduct(productId: $productId, product: $product) {
            status
            productId
        }
    }
`;
