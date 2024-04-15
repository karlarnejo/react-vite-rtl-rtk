import gql from 'graphql-tag';

export const getAllProducts = gql`
    query Query($page: Int, $itemsPerPage: Int) {
        getAllProducts(page: $page, itemsPerPage: $itemsPerPage) {
            totalPages
            totalItems
            data {
                img
                productId
                productName
                productType
                qty
                description
                price {
                    currencyCode
                    value
                }
            }
        }
    }
`;
