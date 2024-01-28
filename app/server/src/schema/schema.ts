import gql from 'graphql-tag';

// TODO: Figure out how to import using index without using ts-loader and webpack
export const typeDefs = gql`
    type Products {
        img: String
        productId: String
        productName: String
        productType: String
        qty: Int
        price: String
        description: String
    }

    input ProductInput {
        img: String
        productName: String
        productType: String
        qty: Int
        price: String
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
        addProduct(product: ProductInput): AddProductResponseStatus,
        editProduct(productId: String, product: ProductInput): EditProductResponseStatus,
        deleteProduct(productId: String): DeleteProductResponseStatus
    }
`;