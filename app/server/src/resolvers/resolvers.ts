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
        }
    }
  };