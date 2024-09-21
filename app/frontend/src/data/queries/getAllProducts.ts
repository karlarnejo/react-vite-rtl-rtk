import gql from 'graphql-tag';

export const getAllProducts = gql`
    query GetAllProducts($page: Int, $itemsPerPage: Int, $searchQuery: String) {
        getAllProducts(page: $page, itemsPerPage: $itemsPerPage, searchQuery: $searchQuery) {
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
