import { IDataSourceContext } from "../common/types.js";
import ProductApi from "./ProductApi/ProductApi.js";

export interface IDataSources {
    productApi: ProductApi
};

export const dataSources = (dataSourceContext: IDataSourceContext) => ({
    productApi: new ProductApi(dataSourceContext)
});