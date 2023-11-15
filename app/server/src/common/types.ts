import { IncomingHttpHeaders } from "http";
import { IDataSources } from "../datasources";

export interface IProducts {
    productName: string;
    description: string;
}

export interface IRequestContext {
    headers: IncomingHttpHeaders;
    datasources: IDataSources;
    // TODO: Add logger type here
    // logger: string;
}

export interface IDataSourceContext {
    contextValue?: IRequestContext
}

export type IBaseDataSource = IRequestContext & IDataSourceContext