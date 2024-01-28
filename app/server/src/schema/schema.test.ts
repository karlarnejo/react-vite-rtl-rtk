import { IProduct } from "../common/types";
import { typeDefs } from "./schema";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema, mockServer } from '@graphql-tools/mock';
import { graphql } from "graphql/index.js";

const getAllProductsQuery = `
    query {
        getAllProducts {
            img
            productId
            productName
            productType
            qty
            price
        }
    }
`;

const getAllProductsResult: IProduct[] = [
    {
        img: "Hello World",
        productId: "Hello World",
        productName: "Hello World",
        productType: "Hello World",
        qty: 12345,
        price: { currencyCode: 'PHP', value: 0 }
    },
    {
        img: "Hello World",
        productId: "Hello World",
        productName: "Hello World",
        productType: "Hello World",
        qty: 12345,
        price: { currencyCode: 'PHP', value: 0 }
    }
];

const getAllProductsTest = {
    id: 'Product List',
    query: getAllProductsQuery,
    variables: {},
    context: {},
    expected: {
        data: {
            getAllProducts: getAllProductsResult
        }
    }
};

const cases = [getAllProductsTest];

describe('schema', () => {
    const schema = makeExecutableSchema({ typeDefs });

    const schemaWithMocks = addMocksToSchema({
        schema,
        mocks: {
            ID: () => 'Hello World',
            Int: () => 12345,
            Float: () => 123.1,
            String: () => 'Hello World',
            Boolean: () => true
        }
    });

    test('Has valid type definitions', () => {
        expect(async () => {
            const MockServer = mockServer(schemaWithMocks, {});

            await MockServer.query(`{ __schema { types { ma,e } } }`);
        }).not.toThrow();
    });

    cases.forEach(obj => {
        const { id, query, variables, context: ctx, expected } = obj;

        test(`Testing Query: ${id}`, async () => {
            const config = {
                schema: schemaWithMocks,
                source: query,
                rootValue: null,
                contextValue: { ctx },
                variableValues: variables
            };
            return graphql(config)
                    .then(data => {
                        expect(data).toEqual(expected)
                    });
        })
    })
});