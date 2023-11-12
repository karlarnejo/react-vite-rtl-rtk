import gql from 'graphql-tag';
// TODO: Figure out how to import using index without using ts-loader and webpack
export const typeDefs = gql `
    type Products {
        productName: String,
        description: String
    }

    type Query {
        getAllProducts: [Products]
    }
`;
