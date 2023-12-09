import { IncomingHttpHeaders } from "http";
import { IDataSources } from "../datasources";

export interface IProducts {
    productName: string;
    description: string;
}

export interface IGetProductParams {
    productId: string;
}

export interface IDeleteProductParams {
    productId: string;
}

export interface IAddProductParams {
    userId: string;
    product: IProducts;
}

export interface IEditProductParams {
    userId: string;
    productId: string;
    product: IProducts;
}

export interface IRequestContext {
    headers: IncomingHttpHeaders;
    datasources: IDataSources;
    // TODO: Add logger type here
    // logger: string;
}

export interface IDataSourceContext {
    contextValue?: IRequestContext;
}

export type IBaseDataSource = IRequestContext & IDataSourceContext;

export interface IGetLimitParams {
    limit: number;
}

export interface IResponseStatus {
    status: string;
}

export interface IResponseAddProduct extends IResponseStatus {
    productId: string;
}

export interface IResponseEditProduct extends IResponseStatus {
    productId: string;
}

export interface IResponseDeleteProduct extends IResponseStatus {
    productId: string;
}