import gql from "graphql-tag";

export const getAllProducts = gql`
    query getAllProducts {
        getAllProducts {
            img
            productId
            productName
            productType
            qty
            price {
                currencyCode
                value
            }
        }
    }
`;