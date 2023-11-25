import { IDataSourceContext } from "../common/types.js";
import ProductApi from "./ProductApi/ProductApi.js";

export interface IDataSources {
    productApi: ProductApi;
    // TODO: Add jwt token api call and store somewhere like localstorage or cookies.
    // jwtToken: JwtTokenApi;
};

export const dataSources = (dataSourceContext: IDataSourceContext) => ({
    productApi: new ProductApi(dataSourceContext)
});