import gql from "graphql-tag";

export const getProduct = gql`
    query getProduct($productId: String) {
        getProduct(productId: $productId) {
            img
            productId
            productName
            productType
            qty
            price {
                currencyCode
                value
            }
            description
        }
    }
`;