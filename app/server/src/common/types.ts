import { IncomingHttpHeaders } from "http";
import { IDataSources } from "../datasources";

export interface IProducts {
    productName: string;
    description: string;
}

export interface IRequestContext {
    headers: IncomingHttpHeaders
}

export interface IDataSourceContext {
    dataSources: IDataSources
}

export type IBaseDataSource = IRequestContext & IDataSourceContext