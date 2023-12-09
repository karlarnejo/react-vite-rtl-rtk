import gql from 'graphql-tag';

// TODO: Figure out how to import using index without using ts-loader and webpack
export const typeDefs = gql`
    type Products {
        productName: String
        description: String
    }

    input ProductInput {
        productName: String
        description: String
    }

    type AddProductResponseStatus {
        status: String
        productId: String
    }

    type EditProductResponseStatus {
        status: String
        productId: String
    }

    type DeleteProductResponseStatus {
        status: String
        productId: String
    }

    type Query {
        getAllProducts: [Products]
        getProduct(productId: String): Products
    }

    type Mutation {
        addProduct(userId: String, product: ProductInput): AddProductResponseStatus,
        editProduct(userId: String, productId: String, product: ProductInput): EditProductResponseStatus,
        deleteProduct(productId: String): DeleteProductResponseStatus
    }
`;