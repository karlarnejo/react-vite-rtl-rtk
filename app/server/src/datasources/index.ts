import ProductApi from "./ProductApi/ProductApi.js";

export interface IDataSources {
    productApi: ProductApi
};

export const dataSources = {
    productApi: new ProductApi()
};