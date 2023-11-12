// TODO: Figure out how to import using index without using ts-loader and webpack
export const resolvers = {
    Query: {
        getAllProducts: async (_, {}, { dataSources }) => {
            return dataSources.productApi.getAllProducts();
        }
    }
};
