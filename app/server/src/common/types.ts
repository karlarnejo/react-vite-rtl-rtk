import { IncomingHttpHeaders } from "http";
import { IDataSources } from "../datasources";
import { ProductType } from "./enums";

export interface IPrice {
    currencyCode: string;
    value: number;
}

export interface IProduct {
    img: string;
    productId: string;
    productName: string;
    productType: ProductType;
    qty: number;
    price: IPrice;
    description?: string;
}

export interface IGetProductParams {
    productId: string;
}

export interface IDeleteProductParams {
    productId: string;
}

export interface IAddProductParams {
    product: IProduct;
}

export interface IEditProductParams {
    productId: string;
    product: IProduct;
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