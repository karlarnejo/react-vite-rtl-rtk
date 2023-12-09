import { IAddProductParams, IEditProductParams, IGetProductParams } from "../common/types";
import { IDataSources } from "../datasources";

// TODO: Figure out how to import using index without using ts-loader and webpack
export const resolvers = {
    Query: {
        getAllProducts: async (
            _: any,
            {}: any,
            { dataSources }: { dataSources: IDataSources }
        ) => {
            return dataSources.productApi.getAllProducts();
        },
        getProduct: async (
            _: any,
            { productId }: IGetProductParams,
            { dataSources }: { dataSources: IDataSources }
        ) => {
            return dataSources.productApi.getProduct(productId);
        }
    },
    Mutation: {
        addProduct: async (
            _: any,
            { userId, product }: IAddProductParams,
            { dataSources }: { dataSources: IDataSources }
        ) => {
            return dataSources.productApi.addProduct(userId, product);
        },
        editProduct: async (
            _: any,
            { userId, productId, product }: IEditProductParams,
            { dataSources }: { dataSources: IDataSources }
        ) => {
            return dataSources.productApi.editProduct(userId, productId, product);
        }
    }
  };